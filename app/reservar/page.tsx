"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LumaLogo } from "@/components/LumaLogo";
import { useReservations } from "@/lib/store";
import { SessionType, TimeSlot, Child, generateBookingCode, getAvailableSlots, TODAY } from "@/lib/data";
import { capacityColor, capacityLabel, formatDate } from "@/lib/utils";
import { ChevronLeft, Check, Users, Clock, QrCode, Mail, Phone, User, Plus, Trash2, Calendar } from "lucide-react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { es } from "date-fns/locale";

const STEPS = ["Sesión", "Fecha y turno", "Tus datos", "Confirmación"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              i < current ? "text-white" : i === current ? "text-[#2C2416] shadow-lg" : "text-[#6B6358]"
            }`}
              style={{
                background: i < current ? "#8DC63F" : i === current ? "#FFCC00" : "#E8E0D5",
                transform: i === current ? "scale(1.15)" : "scale(1)",
              }}>
              {i < current ? <Check size={16} /> : i + 1}
            </div>
            <span className={`mt-1.5 text-[10px] font-semibold uppercase tracking-wide hidden sm:block ${
              i === current ? "text-[#2C2416]" : "text-[#A09080]"
            }`}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-12 sm:w-20 h-0.5 mx-1 mb-4 sm:mb-0 transition-colors ${i < current ? "bg-[#8DC63F]" : "bg-[#E8E0D5]"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function CapacityBar({ booked, capacity }: { booked: number; capacity: number }) {
  const pct = Math.min(100, (booked / capacity) * 100);
  const color = capacityColor(booked, capacity);
  const label = capacityLabel(booked, capacity);
  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[#6B6358]">{booked} / {capacity} niños</span>
        <span className="font-semibold" style={{ color }}>{label}</span>
      </div>
      <div className="h-2 rounded-full bg-[#E8E0D5] overflow-hidden">
        <div className="h-full rounded-full capacity-bar" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function generateDates(count: number) {
  const today = startOfDay(new Date());
  return Array.from({ length: count }, (_, i) => {
    const d = addDays(today, i);
    return {
      value: format(d, "yyyy-MM-dd"),
      dayName: format(d, "EEE", { locale: es }),
      dayNum: format(d, "d"),
      month: format(d, "MMM", { locale: es }),
      isToday: i === 0,
    };
  });
}

function ReservationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { reservations, addReservation } = useReservations();

  const initialType = (searchParams.get("tipo") === "party" ? "party" : "open") as SessionType;
  const [step, setStep] = useState(0);
  const [sessionType, setSessionType] = useState<SessionType>(initialType);
  const [selectedDate, setSelectedDate] = useState(TODAY);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [children, setChildren] = useState<Child[]>([{ name: "", age: 4 }]);
  const [bookingCode, setBookingCode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dates = generateDates(14);
  const slots = getAvailableSlots(selectedDate, sessionType, reservations);

  const addChild = () => setChildren((prev) => [...prev, { name: "", age: 4 }]);
  const removeChild = (i: number) => setChildren((prev) => prev.filter((_, idx) => idx !== i));
  const updateChild = (i: number, field: keyof Child, val: string | number) =>
    setChildren((prev) => prev.map((c, idx) => idx === i ? { ...c, [field]: val } : c));

  function validateStep(): boolean {
    const errs: Record<string, string> = {};
    if (step === 1 && !selectedSlot) errs.slot = "Seleccioná un turno disponible";
    if (step === 2) {
      if (!parentName.trim()) errs.name = "Ingresá tu nombre completo";
      if (!parentEmail.trim() || !parentEmail.includes("@")) errs.email = "Email inválido";
      if (!parentPhone.trim()) errs.phone = "Ingresá tu número de teléfono";
      children.forEach((c, i) => {
        if (!c.name.trim()) errs[`child_${i}`] = "Ingresá el nombre del niño";
      });
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleNext() {
    if (!validateStep()) return;
    if (step === 2) {
      const code = generateBookingCode();
      setBookingCode(code);
      addReservation({
        id: `r_${Date.now()}`,
        bookingCode: code,
        date: selectedDate,
        slotId: selectedSlot!.id,
        slotTime: selectedSlot!.time,
        slotEndTime: selectedSlot!.endTime,
        sessionType,
        parentName,
        parentEmail,
        parentPhone,
        children,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      });
    }
    setStep((s) => s + 1);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-10 px-4" style={{ background: "#FEFAF4" }}>
        <div className="max-w-2xl mx-auto">
          {step < 3 && (
            <>
              <div className="flex items-center justify-between mb-6">
                {step > 0 ? (
                  <button onClick={() => setStep((s) => s - 1)}
                    className="flex items-center gap-1.5 text-sm font-medium text-[#6B6358] hover:text-[#2C2416]">
                    <ChevronLeft size={16} /> Atrás
                  </button>
                ) : <Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-[#6B6358] hover:text-[#2C2416]">
                  <ChevronLeft size={16} /> Inicio
                </Link>}
                <span className="text-sm text-[#6B6358]">Paso {step + 1} de 3</span>
              </div>
              <StepIndicator current={step} />
            </>
          )}

          {/* STEP 0 — Tipo de sesión */}
          {step === 0 && (
            <div>
              <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2rem", color: "#2C2416" }} className="mb-2">
                ¿Qué tipo de sesión querés?
              </h1>
              <p className="text-[#6B6358] mb-8 text-sm">Elegí la experiencia que mejor se adapta a vos y a tus pequeños.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {([
                  {
                    type: "open" as SessionType,
                    emoji: "🎭", title: "Sesión Abierta",
                    subtitle: "Juego libre · 2 horas",
                    desc: "Acceso a todos los mundos del espacio con otros niños. Ideal para la visita habitual.",
                    color: "#FFCC00", bg: "#FFFADB",
                    features: ["Todos los mundos", "Hasta 25 niños", "Adultos en cafetería"],
                  },
                  {
                    type: "party" as SessionType,
                    emoji: "🎉", title: "Fiesta Privada",
                    subtitle: "Exclusivo · 3 horas",
                    desc: "El espacio completo solo para tu grupo. Perfecto para cumpleaños y celebraciones.",
                    color: "#4ABFB5", bg: "#E4F6F5",
                    features: ["Espacio exclusivo", "Zona de celebración", "Coordinación incluida"],
                  },
                ] as const).map((opt) => (
                  <button key={opt.type} onClick={() => { setSessionType(opt.type); setStep(1); }}
                    className={`text-left rounded-3xl p-7 border-2 hover:scale-[1.02] hover:shadow-lg transition-all ${
                      sessionType === opt.type ? "shadow-md" : ""
                    }`}
                    style={{
                      background: opt.bg,
                      borderColor: sessionType === opt.type ? opt.color : `${opt.color}40`,
                    }}>
                    <span className="text-5xl block mb-3">{opt.emoji}</span>
                    <h3 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.4rem", color: "#2C2416" }}>
                      {opt.title}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: opt.color }}>
                      {opt.subtitle}
                    </p>
                    <p className="text-sm text-[#6B6358] mb-4">{opt.desc}</p>
                    <ul className="flex flex-col gap-1.5">
                      {opt.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-[#2C2416]">
                          <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px]"
                            style={{ background: opt.color }}>✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 — Fecha y turno */}
          {step === 1 && (
            <div>
              <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2rem", color: "#2C2416" }} className="mb-2">
                Elegí fecha y turno
              </h1>
              <p className="text-[#6B6358] mb-6 text-sm">
                {sessionType === "open" ? "Sesión abierta · 2 horas" : "Fiesta privada · 3 horas"}
              </p>

              {/* Date picker */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#2C2416] mb-3 flex items-center gap-2">
                  <Calendar size={15} className="text-[#F5834A]" /> Fecha
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {dates.map((d) => (
                    <button key={d.value} onClick={() => { setSelectedDate(d.value); setSelectedSlot(null); }}
                      className={`shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl border-2 transition-all ${
                        selectedDate === d.value ? "shadow-md scale-105" : "hover:border-[#FFCC00]/60"
                      }`}
                      style={{
                        background: selectedDate === d.value ? "#FFCC00" : "white",
                        borderColor: selectedDate === d.value ? "#FFCC00" : "#E8E0D5",
                        color: "#2C2416",
                      }}>
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-[#6B6358]">{d.dayName}</span>
                      <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.5rem", lineHeight: 1 }}>{d.dayNum}</span>
                      <span className="text-[10px] capitalize text-[#6B6358]">{d.month}</span>
                      {d.isToday && (
                        <span className="text-[9px] font-bold mt-0.5" style={{ color: "#E05A3A" }}>HOY</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slots */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2416] mb-3 flex items-center gap-2">
                  <Clock size={15} className="text-[#4ABFB5]" /> Turno disponible
                </label>
                <div className="flex flex-col gap-3">
                  {slots.map((slot) => {
                    const available = slot.capacity - slot.booked;
                    const isFull = available <= 0;
                    const isSelected = selectedSlot?.id === slot.id;
                    return (
                      <button key={slot.id} disabled={isFull}
                        onClick={() => setSelectedSlot(slot)}
                        className={`text-left rounded-2xl p-4 border-2 transition-all ${
                          isFull ? "opacity-50 cursor-not-allowed" :
                          isSelected ? "shadow-md" : "hover:border-[#FFCC00]/60 hover:shadow-sm"
                        }`}
                        style={{
                          background: isSelected ? "#FFFADB" : "white",
                          borderColor: isSelected ? "#FFCC00" : "#E8E0D5",
                        }}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-[#2C2416]">{slot.label}</p>
                            <p className="text-xs text-[#6B6358] mt-0.5">
                              {sessionType === "open" ? "Sesión abierta · 2h" : "Fiesta privada · 3h"}
                            </p>
                          </div>
                          {isSelected && (
                            <div className="w-7 h-7 rounded-full flex items-center justify-center"
                              style={{ background: "#FFCC00" }}>
                              <Check size={14} className="text-[#2C2416]" />
                            </div>
                          )}
                          {isFull && (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                              style={{ background: "#E05A3A" }}>LLENO</span>
                          )}
                        </div>
                        <CapacityBar booked={slot.booked} capacity={slot.capacity} />
                      </button>
                    );
                  })}
                </div>
                {errors.slot && <p className="text-sm mt-2" style={{ color: "#E05A3A" }}>{errors.slot}</p>}
              </div>

              <button onClick={handleNext}
                className="w-full mt-8 py-4 rounded-full font-bold text-lg text-[#2C2416] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #FFCC00, #F5834A)" }}>
                Continuar →
              </button>
            </div>
          )}

          {/* STEP 2 — Datos personales */}
          {step === 2 && (
            <div>
              <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2rem", color: "#2C2416" }} className="mb-2">
                Completá tus datos
              </h1>

              {/* Summary card */}
              {selectedSlot && (
                <div className="rounded-2xl p-4 mb-6 flex flex-wrap gap-4"
                  style={{ background: "#FFFADB", border: "1.5px solid #FFCC0060" }}>
                  <div className="flex items-center gap-2 text-sm text-[#2C2416]">
                    <Calendar size={14} className="text-[#F5834A]" />
                    {formatDate(selectedDate).replace(/^\w/, (c) => c.toUpperCase())}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#2C2416]">
                    <Clock size={14} className="text-[#F5834A]" />
                    {selectedSlot.label}
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: "#F5834A" }}>
                    <Users size={14} />
                    {capacityLabel(selectedSlot.booked, selectedSlot.capacity)}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-semibold text-[#2C2416]">Datos del responsable</h3>

                <div>
                  <label className="block text-xs font-semibold text-[#6B6358] mb-1.5 uppercase tracking-wide">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A09080]" />
                    <input value={parentName} onChange={(e) => setParentName(e.target.value)}
                      placeholder="Tu nombre y apellido"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                      style={{
                        borderColor: errors.name ? "#E05A3A" : "#E8E0D5",
                        background: "white",
                        color: "#2C2416",
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#FFCC00"}
                      onBlur={(e) => e.target.style.borderColor = errors.name ? "#E05A3A" : "#E8E0D5"} />
                  </div>
                  {errors.name && <p className="text-xs mt-1" style={{ color: "#E05A3A" }}>{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B6358] mb-1.5 uppercase tracking-wide">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A09080]" />
                    <input value={parentEmail} onChange={(e) => setParentEmail(e.target.value)}
                      placeholder="correo@ejemplo.com" type="email"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ borderColor: errors.email ? "#E05A3A" : "#E8E0D5", background: "white", color: "#2C2416" }}
                      onFocus={(e) => e.target.style.borderColor = "#FFCC00"}
                      onBlur={(e) => e.target.style.borderColor = errors.email ? "#E05A3A" : "#E8E0D5"} />
                  </div>
                  {errors.email && <p className="text-xs mt-1" style={{ color: "#E05A3A" }}>{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B6358] mb-1.5 uppercase tracking-wide">
                    Teléfono / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A09080]" />
                    <input value={parentPhone} onChange={(e) => setParentPhone(e.target.value)}
                      placeholder="8888-8888"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ borderColor: errors.phone ? "#E05A3A" : "#E8E0D5", background: "white", color: "#2C2416" }}
                      onFocus={(e) => e.target.style.borderColor = "#FFCC00"}
                      onBlur={(e) => e.target.style.borderColor = errors.phone ? "#E05A3A" : "#E8E0D5"} />
                  </div>
                  {errors.phone && <p className="text-xs mt-1" style={{ color: "#E05A3A" }}>{errors.phone}</p>}
                </div>

                {/* Children */}
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-[#2C2416]">
                      Niños que asistirán ({children.length})
                    </h3>
                    {children.length < 8 && (
                      <button onClick={addChild}
                        className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                        style={{ background: "#8DC63F20", color: "#5a9a20" }}>
                        <Plus size={12} /> Agregar niño
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    {children.map((child, i) => (
                      <div key={i} className="rounded-2xl p-4 border"
                        style={{ borderColor: errors[`child_${i}`] ? "#E05A3A" : "#E8E0D5", background: "white" }}>
                        <div className="flex gap-3 items-start">
                          <div className="flex-1">
                            <input value={child.name} onChange={(e) => updateChild(i, "name", e.target.value)}
                              placeholder={`Nombre del niño ${i + 1}`}
                              className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                              style={{ borderColor: "#E8E0D5", background: "#FEFAF4", color: "#2C2416" }} />
                            {errors[`child_${i}`] && (
                              <p className="text-xs mt-1" style={{ color: "#E05A3A" }}>{errors[`child_${i}`]}</p>
                            )}
                          </div>
                          <select value={child.age} onChange={(e) => updateChild(i, "age", Number(e.target.value))}
                            className="px-3 py-2 rounded-lg border text-sm outline-none"
                            style={{ borderColor: "#E8E0D5", background: "#FEFAF4", color: "#2C2416", minWidth: "80px" }}>
                            {Array.from({ length: 11 }, (_, a) => (
                              <option key={a} value={a}>{a === 0 ? "< 1 año" : `${a} años`}</option>
                            ))}
                          </select>
                          {children.length > 1 && (
                            <button onClick={() => removeChild(i)}
                              className="p-2 rounded-lg hover:bg-red-50 text-[#E05A3A] transition-colors">
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={handleNext}
                className="w-full mt-8 py-4 rounded-full font-bold text-lg text-[#2C2416] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #FFCC00, #F5834A)" }}>
                Confirmar reserva →
              </button>
              <p className="text-center text-xs text-[#A09080] mt-3">
                Al confirmar aceptás los <span className="underline cursor-pointer">términos y condiciones</span> de LUMA.
              </p>
            </div>
          )}

          {/* STEP 3 — Confirmación */}
          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg"
                style={{ background: "linear-gradient(135deg, #FFCC00, #8DC63F)" }}>
                🎉
              </div>
              <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2.5rem", color: "#2C2416" }}>
                ¡Reserva confirmada!
              </h1>
              <p className="text-[#6B6358] mt-2 mb-8">
                Se envió la confirmación a <strong style={{ color: "#2C2416" }}>{parentEmail}</strong>
              </p>

              {/* Booking card */}
              <div className="rounded-3xl overflow-hidden shadow-xl border-2 mb-8 text-left"
                style={{ borderColor: "#FFCC0060" }}>
                {/* Header */}
                <div className="p-6" style={{ background: "linear-gradient(135deg, #FFCC00, #F5834A)" }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#2C2416]/70">Código de reserva</p>
                      <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2rem", color: "#2C2416", letterSpacing: "0.1em" }}>
                        {bookingCode}
              </p>
                    </div>
                    <LumaLogo size="sm" />
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3" style={{ background: "white" }}>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "#FFFADB" }}>
                      <Calendar size={14} className="text-[#F5834A]" />
                    </span>
                    <div>
                      <p className="text-xs text-[#6B6358]">Fecha</p>
                      <p className="font-semibold text-[#2C2416] capitalize">{formatDate(selectedDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "#E4F6F5" }}>
                      <Clock size={14} className="text-[#4ABFB5]" />
                    </span>
                    <div>
                      <p className="text-xs text-[#6B6358]">Horario</p>
                      <p className="font-semibold text-[#2C2416]">{selectedSlot?.label}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "#F0F9E0" }}>
                      <Users size={14} className="text-[#8DC63F]" />
                    </span>
                    <div>
                      <p className="text-xs text-[#6B6358]">Niños registrados</p>
                      <p className="font-semibold text-[#2C2416]">
                        {children.map((c) => `${c.name} (${c.age === 0 ? "< 1 año" : `${c.age} años`})`).join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "#FDEDE9" }}>
                      <User size={14} className="text-[#E05A3A]" />
                    </span>
                    <div>
                      <p className="text-xs text-[#6B6358]">Responsable</p>
                      <p className="font-semibold text-[#2C2416]">{parentName}</p>
                    </div>
                  </div>
                </div>

                {/* QR Code mock */}
                <div className="p-6 border-t flex flex-col items-center gap-3"
                  style={{ borderColor: "#E8E0D5", background: "#FEFAF4" }}>
                  <div className="p-4 rounded-2xl bg-white shadow-inner border border-[#E8E0D5]">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      {/* Simulated QR code pattern */}
                      <rect width="120" height="120" fill="white" rx="8" />
                      {/* Corner squares */}
                      {[[5,5],[85,5],[5,85]].map(([x,y],i) => (
                        <g key={i}>
                          <rect x={x} y={y} width="30" height="30" fill="#2C2416" rx="3" />
                          <rect x={x+4} y={y+4} width="22" height="22" fill="white" rx="1" />
                          <rect x={x+8} y={y+8} width="14" height="14" fill="#2C2416" rx="1" />
                        </g>
                      ))}
                      {/* Random dots */}
                      {Array.from({length:28},(_,i)=>{
                        const row = Math.floor(i/7), col = i % 7;
                        if ((row<2 && col<2)||(row<2 && col>4)||(row>4 && col<2)) return null;
                        const x = 42 + col * 11, y = 42 + row * 11;
                        return <rect key={i} x={x} y={y} width="7" height="7" fill="#2C2416" rx="1" />;
                      })}
                      {/* LUMA label below pattern */}
                      <text x="60" y="114" textAnchor="middle" fontSize="8" fill="#6B6358" fontFamily="Open Sans, sans-serif">
                        {bookingCode}
                      </text>
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6B6358]">
                    <QrCode size={13} className="text-[#4ABFB5]" />
                    Presentá este QR al llegar a LUMA
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/"
                  className="px-6 py-3 rounded-full font-semibold text-sm border-2 hover:bg-[#FFCC0010] transition-colors"
                  style={{ borderColor: "#FFCC00", color: "#2C2416" }}>
                  Volver al inicio
                </Link>
                <Link href="/checkin"
                  className="px-6 py-3 rounded-full font-semibold text-sm text-white transition-transform hover:scale-105"
                  style={{ background: "#4ABFB5" }}>
                  Ir al check-in
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ReservarPage() {
  return (
    <Suspense>
      <ReservationContent />
    </Suspense>
  );
}
