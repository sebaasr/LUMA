"use client";

import { useState } from "react";
import Link from "next/link";
import { LumaLogo } from "@/components/LumaLogo";
import { useReservations } from "@/lib/store";
import { Reservation } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { QrCode, Search, Check, Clock, Users, Calendar, ArrowLeft, Scan, User, X } from "lucide-react";

type Mode = "home" | "qr" | "search" | "found" | "success";

export default function CheckinPage() {
  const { reservations, checkIn } = useReservations();
  const [mode, setMode] = useState<Mode>("home");
  const [query, setQuery] = useState("");
  const [found, setFound] = useState<Reservation | null>(null);
  const [error, setError] = useState("");

  const now = new Date();
  const timeStr = now.toLocaleTimeString("es-CR", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("es-CR", { weekday: "long", day: "numeric", month: "long" });

  function handleSearch() {
    setError("");
    const q = query.trim().toLowerCase();
    if (!q) { setError("Ingresá un código o nombre"); return; }
    const result = reservations.find((r) =>
      r.bookingCode.toLowerCase() === q ||
      r.parentName.toLowerCase().includes(q) ||
      r.children.some((c) => c.name.toLowerCase().includes(q))
    );
    if (!result) {
      setError("No se encontró ninguna reserva con ese dato.");
      return;
    }
    if (result.status === "cancelled") {
      setError("Esta reserva fue cancelada.");
      return;
    }
    setFound(result);
    setMode("found");
  }

  function handleCheckIn() {
    if (!found) return;
    checkIn(found.id);
    setMode("success");
    setTimeout(() => {
      setMode("home");
      setFound(null);
      setQuery("");
    }, 5000);
  }

  const alreadyCheckedIn = found?.status === "checked-in";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#2C2416" }}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "rgba(255,204,0,0.15)" }}>
        <LumaLogo size="sm" variant="light" />
        <div className="text-right">
          <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.6rem", color: "#FFCC00", lineHeight: 1 }}>
            {timeStr}
          </p>
          <p className="text-xs capitalize mt-0.5" style={{ color: "rgba(254,250,244,0.55)" }}>
            {dateStr}
          </p>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center p-6">

        {/* HOME */}
        {mode === "home" && (
          <div className="w-full max-w-md text-center">
            <div className="text-6xl mb-6">👋</div>
            <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2.4rem", color: "#FFCC00" }}>
              ¡Bienvenidos a LUMA!
            </h1>
            <p className="mt-2 mb-10" style={{ color: "rgba(254,250,244,0.65)" }}>
              Para ingresar, realizá tu check-in aquí
            </p>

            <div className="flex flex-col gap-4">
              <button onClick={() => setMode("qr")}
                className="w-full py-5 rounded-3xl flex items-center justify-center gap-4 font-semibold text-lg text-[#2C2416] transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #FFCC00, #F5834A)" }}>
                <Scan size={28} />
                Escanear código QR
              </button>

              <button onClick={() => setMode("search")}
                className="w-full py-5 rounded-3xl flex items-center justify-center gap-4 font-semibold text-lg border-2 transition-all hover:border-[#4ABFB5] hover:bg-[#4ABFB510]"
                style={{ borderColor: "rgba(254,250,244,0.2)", color: "rgba(254,250,244,0.85)" }}>
                <Search size={24} />
                Buscar por nombre o código
              </button>
            </div>

            <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm"
              style={{ color: "rgba(254,250,244,0.35)" }}>
              <ArrowLeft size={14} /> Volver al sitio
            </Link>
          </div>
        )}

        {/* QR SCAN MODE */}
        {mode === "qr" && (
          <div className="w-full max-w-md text-center">
            <button onClick={() => setMode("home")}
              className="mb-6 flex items-center gap-2 text-sm mx-auto"
              style={{ color: "rgba(254,250,244,0.5)" }}>
              <ArrowLeft size={14} /> Atrás
            </button>
            <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.8rem", color: "#FEFAF4" }} className="mb-2">
              Escaneá tu QR
            </h2>
            <p className="text-sm mb-8" style={{ color: "rgba(254,250,244,0.55)" }}>
              Mostrá el código que recibiste por email
            </p>

            {/* QR Scanner mock */}
            <div className="relative mx-auto rounded-3xl overflow-hidden"
              style={{ width: 280, height: 280, background: "#1a1510" }}>
              {/* Camera viewfinder effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  {/* Corner markers */}
                  {[
                    "top-0 left-0 border-t-4 border-l-4 rounded-tl-lg",
                    "top-0 right-0 border-t-4 border-r-4 rounded-tr-lg",
                    "bottom-0 left-0 border-b-4 border-l-4 rounded-bl-lg",
                    "bottom-0 right-0 border-b-4 border-r-4 rounded-br-lg",
                  ].map((cls, i) => (
                    <div key={i} className={`absolute w-8 h-8 ${cls}`}
                      style={{ borderColor: "#FFCC00" }} />
                  ))}
                  {/* Scan line animation */}
                  <div className="absolute left-1 right-1 h-0.5 rounded"
                    style={{
                      background: "linear-gradient(90deg, transparent, #FFCC00, transparent)",
                      top: "50%",
                      animation: "scan-line 2s ease-in-out infinite",
                    }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <QrCode size={60} style={{ color: "rgba(255,204,0,0.2)" }} />
                  </div>
                </div>
              </div>
            </div>

            <style>{`
              @keyframes scan-line {
                0%, 100% { top: 10%; }
                50% { top: 90%; }
              }
            `}</style>

            <p className="mt-6 text-sm" style={{ color: "rgba(254,250,244,0.4)" }}>
              En el prototipo real, aquí se activaría la cámara
            </p>

            {/* Demo: try searching manually */}
            <button onClick={() => setMode("search")}
              className="mt-4 text-sm underline"
              style={{ color: "#4ABFB5" }}>
              Buscar manualmente en su lugar →
            </button>
          </div>
        )}

        {/* SEARCH MODE */}
        {mode === "search" && (
          <div className="w-full max-w-md">
            <button onClick={() => setMode("home")}
              className="mb-6 flex items-center gap-2 text-sm"
              style={{ color: "rgba(254,250,244,0.5)" }}>
              <ArrowLeft size={14} /> Atrás
            </button>
            <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.8rem", color: "#FEFAF4" }} className="mb-2">
              Buscar reserva
            </h2>
            <p className="text-sm mb-6" style={{ color: "rgba(254,250,244,0.55)" }}>
              Ingresá el código de reserva, nombre del padre/madre o nombre del niño
            </p>

            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(254,250,244,0.4)" }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="LUM-1234 · Andrea Mora · Sofía..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl text-base outline-none"
                style={{
                  background: "rgba(254,250,244,0.08)",
                  border: "1.5px solid rgba(254,250,244,0.15)",
                  color: "#FEFAF4",
                }}
                autoFocus
              />
            </div>

            {error && (
              <div className="mt-3 flex items-center gap-2 text-sm px-4 py-3 rounded-xl"
                style={{ background: "#E05A3A20", color: "#E05A3A", border: "1px solid #E05A3A40" }}>
                <X size={14} /> {error}
              </div>
            )}

            <button onClick={handleSearch}
              className="w-full mt-4 py-4 rounded-2xl font-bold text-lg text-[#2C2416] transition-transform hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #FFCC00, #F5834A)" }}>
              Buscar reserva
            </button>

            {/* Quick access */}
            <div className="mt-8">
              <p className="text-xs mb-3 text-center uppercase tracking-wide"
                style={{ color: "rgba(254,250,244,0.3)" }}>
                Reservas de hoy (demo)
              </p>
              <div className="flex flex-col gap-2">
                {reservations.filter((r) => r.status !== "cancelled").slice(0, 4).map((r) => (
                  <button key={r.id}
                    onClick={() => { setFound(r); setMode("found"); }}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all hover:bg-white/10"
                    style={{ background: "rgba(254,250,244,0.05)", border: "1px solid rgba(254,250,244,0.08)" }}>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#FEFAF4" }}>{r.parentName}</p>
                      <p className="text-xs" style={{ color: "rgba(254,250,244,0.45)" }}>
                        {r.bookingCode} · {r.slotTime} – {r.slotEndTime}
                      </p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                      r.status === "checked-in" ? "text-[#8DC63F]" : "text-[#FFCC00]"
                    }`}
                      style={{
                        background: r.status === "checked-in" ? "#8DC63F20" : "#FFCC0020",
                      }}>
                      {r.status === "checked-in" ? "✓ Ingresó" : "Pendiente"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FOUND */}
        {mode === "found" && found && (
          <div className="w-full max-w-md">
            <button onClick={() => { setMode("search"); setFound(null); }}
              className="mb-6 flex items-center gap-2 text-sm"
              style={{ color: "rgba(254,250,244,0.5)" }}>
              <ArrowLeft size={14} /> Atrás
            </button>

            <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.8rem", color: "#FEFAF4" }} className="mb-6">
              Reserva encontrada
            </h2>

            <div className="rounded-3xl overflow-hidden mb-6"
              style={{ background: "rgba(254,250,244,0.06)", border: "1.5px solid rgba(254,250,244,0.12)" }}>
              {/* Booking header */}
              <div className="p-5" style={{ background: "linear-gradient(135deg, #FFCC00, #F5834A)" }}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#2C2416]/70">Código</p>
                    <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.8rem", color: "#2C2416" }}>
                      {found.bookingCode}
                    </p>
                  </div>
                  {alreadyCheckedIn ? (
                    <div className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: "#8DC63F" }}>
                      <Check size={24} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(44,36,22,0.2)" }}>
                      <Clock size={24} className="text-[#2C2416]" />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(254,250,244,0.08)" }}>
                    <User size={16} style={{ color: "#FFCC00" }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "rgba(254,250,244,0.45)" }}>Responsable</p>
                    <p className="font-semibold" style={{ color: "#FEFAF4" }}>{found.parentName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(254,250,244,0.08)" }}>
                    <Calendar size={16} style={{ color: "#4ABFB5" }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "rgba(254,250,244,0.45)" }}>Fecha y hora</p>
                    <p className="font-semibold capitalize" style={{ color: "#FEFAF4" }}>
                      {formatDate(found.date)} · {found.slotTime} – {found.slotEndTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(254,250,244,0.08)" }}>
                    <Users size={16} style={{ color: "#8DC63F" }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "rgba(254,250,244,0.45)" }}>Niños ({found.children.length})</p>
                    <p className="font-semibold" style={{ color: "#FEFAF4" }}>
                      {found.children.map((c) => `${c.name}, ${c.age === 0 ? "< 1 año" : `${c.age} años`}`).join(" · ")}
                    </p>
                  </div>
                </div>

                {/* Session type badge */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{
                      background: found.sessionType === "open" ? "#FFCC0025" : "#4ABFB525",
                      color: found.sessionType === "open" ? "#FFCC00" : "#4ABFB5",
                      border: `1px solid ${found.sessionType === "open" ? "#FFCC0040" : "#4ABFB540"}`,
                    }}>
                    {found.sessionType === "open" ? "🎭 Sesión Abierta" : "🎉 Fiesta Privada"}
                  </span>
                  {alreadyCheckedIn && (
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold"
                      style={{ background: "#8DC63F25", color: "#8DC63F", border: "1px solid #8DC63F40" }}>
                      ✓ Ya realizó check-in
                    </span>
                  )}
                </div>
              </div>
            </div>

            {alreadyCheckedIn ? (
              <div className="text-center py-4">
                <p style={{ color: "#8DC63F" }} className="font-semibold">Esta familia ya está dentro de LUMA.</p>
                <button onClick={() => { setMode("home"); setFound(null); setQuery(""); }}
                  className="mt-4 text-sm underline" style={{ color: "rgba(254,250,244,0.4)" }}>
                  Volver al inicio
                </button>
              </div>
            ) : (
              <button onClick={handleCheckIn}
                className="w-full py-5 rounded-3xl font-bold text-xl text-[#2C2416] transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
                style={{ background: "linear-gradient(135deg, #8DC63F, #4ABFB5)" }}>
                ✓ Confirmar check-in
              </button>
            )}
          </div>
        )}

        {/* SUCCESS */}
        {mode === "success" && (
          <div className="w-full max-w-md text-center">
            <div className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
              style={{ background: "linear-gradient(135deg, #8DC63F, #4ABFB5)" }}>
              <Check size={56} className="text-white" strokeWidth={3} />
            </div>
            <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "3rem", color: "#FFCC00" }}>
              ¡Bienvenidos!
            </h1>
            <p className="mt-3 text-xl font-semibold" style={{ color: "#FEFAF4" }}>
              {found?.parentName}
            </p>
            <p className="mt-1 text-base" style={{ color: "rgba(254,250,244,0.6)" }}>
              {found?.children.map((c) => c.name).join(", ")} ya pueden entrar a los mundos LUMA 🚀
            </p>
            <div className="mt-8 p-4 rounded-2xl"
              style={{ background: "rgba(141,198,63,0.1)", border: "1px solid rgba(141,198,63,0.3)" }}>
              <p className="text-sm" style={{ color: "rgba(254,250,244,0.55)" }}>
                Esta pantalla se reinicia automáticamente en 5 segundos
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
