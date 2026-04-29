"use client";

import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MUNDOS } from "@/lib/data";
import { ChevronDown, Star, Shield, Clock, Users, Smile, Coffee } from "lucide-react";

const FAQS = [
  {
    q: "¿Cuántos niños pueden entrar al espacio?",
    a: "LUMA tiene una capacidad máxima de 25 niños por sesión, distribuidos entre todas las zonas de juego. Esto nos permite garantizar atención personalizada y un ambiente seguro para cada uno.",
  },
  {
    q: "¿Qué edades son bienvenidas?",
    a: "LUMA está diseñado para niños de 0 a 10 años. Contamos con una zona especial para bebés de 0–3 años con materiales y estímulos adaptados a su etapa de desarrollo.",
  },
  {
    q: "¿Los adultos pueden entrar al área de juego?",
    a: "Los papás pueden acompañar a sus hijos en cualquier zona. Sin embargo, la cafetería y el lounge están pensados para que los adultos se relajen con vista completa al espacio de juego.",
  },
  {
    q: "¿Qué pasa si necesito cancelar?",
    a: "Podés cancelar o reagendar tu reserva hasta 24 horas antes sin ningún cargo. Para cancelaciones con menos anticipación, se aplica la política indicada en los términos de uso.",
  },
  {
    q: "¿Cómo funciona el check-in?",
    a: "Al confirmar tu reserva, recibís un código QR único por correo. Al llegar, lo escaneás en el kiosko de entrada o el staff lo busca por nombre. ¡Sin filas, sin esperas!",
  },
  {
    q: "¿Puedo organizar una fiesta privada?",
    a: "¡Claro! Las sesiones privadas incluyen el espacio completo por 3 horas. Coordinamos decoración, catering y actividades especiales según tus necesidades.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "#FFCC0040" }}>
      <button
        className="w-full flex justify-between items-center py-4 text-left gap-4"
        onClick={() => setOpen(!open)}>
        <span className="font-semibold text-[#2C2416]" style={{ fontFamily: "'Open Sans', sans-serif" }}>{q}</span>
        <ChevronDown size={18} className="shrink-0 transition-transform text-[#F5834A]"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }} />
      </button>
      {open && (
        <p className="pb-4 text-sm leading-relaxed text-[#6B6358]">{a}</p>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">

        {/* HERO */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden dot-pattern"
          style={{ background: "linear-gradient(160deg, #FEFAF4 0%, #FFF9E6 40%, #FFF0D8 100%)" }}>
          {/* Decorative blobs */}
          <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #FFCC00, transparent 70%)" }} />
          <div className="absolute bottom-[-40px] left-[-60px] w-64 h-64 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #4ABFB5, transparent 70%)" }} />

          <div className="max-w-6xl mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <div className="animate-fade-up">
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
                style={{ background: "#4ABFB520", color: "#3aada3" }}>
                <span className="w-2 h-2 rounded-full bg-[#4ABFB5] animate-pulse" />
                Curridabat · Abierto hoy
              </span>

              <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "clamp(2.8rem, 6vw, 5rem)", lineHeight: 1.05, color: "#2C2416", fontWeight: 600 }}>
                Donde cada niño{" "}
                <span style={{ color: "#FFCC00" }}>orbita</span>{" "}
                su propio mundo
              </h1>

              <p className="mt-5 text-lg leading-relaxed" style={{ color: "#6B6358", maxWidth: "480px" }}>
                <strong style={{ color: "#F5834A" }}>Play time for them, coffee time for you.</strong>{" "}
                LUMA es el espacio de juego libre más especial de Curridabat — 10 mundos temáticos, cafetería para adultos y fiestas privadas.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/reservar"
                  className="px-7 py-3.5 rounded-full font-bold text-base text-[#2C2416] shadow-lg hover:scale-105 active:scale-95 transition-transform"
                  style={{ background: "linear-gradient(135deg, #FFCC00 0%, #F5834A 100%)" }}>
                  Reservar mi sesión
                </Link>
                <a href="#mundos"
                  className="px-7 py-3.5 rounded-full font-semibold text-base border-2 hover:bg-[#FFCC0015] transition-colors"
                  style={{ borderColor: "#FFCC00", color: "#2C2416" }}>
                  Ver los mundos
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-5">
                {[
                  { icon: <Users size={16} />, label: "Máx. 25 niños / sesión" },
                  { icon: <Clock size={16} />, label: "L–D 9am – 5pm" },
                  { icon: <Shield size={16} />, label: "0 – 10 años" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm font-medium" style={{ color: "#6B6358" }}>
                    <span style={{ color: "#4ABFB5" }}>{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero illustration — grid of worlds */}
            <div className="hidden lg:grid grid-cols-3 gap-3 animate-fade-up-delay-2">
              {MUNDOS.slice(0, 9).map((m) => (
                <div key={m.id}
                  className="rounded-2xl p-4 flex flex-col items-center gap-2 text-center hover:scale-105 transition-transform cursor-default"
                  style={{ background: m.bg, border: `1.5px solid ${m.color}30` }}>
                  <span className="text-3xl">{m.emoji}</span>
                  <span className="text-xs font-semibold" style={{ color: m.color, fontFamily: "'Open Sans', sans-serif" }}>
                    {m.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Wave bottom */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" className="w-full">
              <path d="M0 80 Q360 0 720 40 Q1080 80 1440 20 L1440 80 Z" fill="#FEFAF4" />
            </svg>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className="py-20 bg-[#FEFAF4]">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2.5rem", color: "#2C2416", fontWeight: 600 }}>
                Reservar es muy sencillo
              </h2>
              <p className="mt-2 text-[#6B6358]">En tres pasos ya tenés tu lugar asegurado</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { n: "01", color: "#FFCC00", icon: "🗓️", title: "Elegís fecha y turno", desc: "Seleccioná el día y la sesión que mejor se adapta a vos. Ves los cupos disponibles en tiempo real." },
                { n: "02", color: "#F5834A", icon: "👨‍👩‍👧", title: "Completás el formulario", desc: "Nombre del papá/mamá, datos de los niños y confirmación. Rápido y sin complicaciones." },
                { n: "03", color: "#4ABFB5", icon: "✅", title: "Llegás y hacés check-in", desc: "Recibís un QR por email. Lo escaneás en la entrada y ¡listo! No hay filas ni esperas." },
              ].map((step) => (
                <div key={step.n} className="relative rounded-3xl p-8 text-center"
                  style={{ background: `${step.color}15`, border: `2px solid ${step.color}30` }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-4 mx-auto"
                    style={{ background: step.color, color: "#2C2416", fontFamily: "'Fredoka', sans-serif" }}>
                    {step.n}
                  </div>
                  <div className="text-4xl mb-3">{step.icon}</div>
                  <h3 className="font-semibold text-lg mb-2 text-[#2C2416]"
                    style={{ fontFamily: "'Fredoka', sans-serif" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#6B6358] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/reservar"
                className="inline-flex px-8 py-3.5 rounded-full font-bold text-[#2C2416] hover:scale-105 transition-transform"
                style={{ background: "linear-gradient(135deg, #FFCC00, #F5834A)" }}>
                Reservar ahora →
              </Link>
            </div>
          </div>
        </section>

        {/* LOS MUNDOS LUMA */}
        <section id="mundos" className="py-20" style={{ background: "#FFF9E8" }}>
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ background: "#FFCC0030", color: "#C8956C" }}>
                Órbitas de Luz
              </span>
              <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2.5rem", color: "#2C2416", fontWeight: 600 }}>
                Los 10 Mundos LUMA
              </h2>
              <p className="mt-2 text-[#6B6358] max-w-lg mx-auto">
                Cada niño es un mundo. El espacio se organiza como un sistema solar — cada zona tiene su propia personalidad, color y propósito.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {MUNDOS.map((m) => (
                <div key={m.id}
                  className="rounded-3xl p-5 flex flex-col items-center gap-3 text-center hover:scale-105 hover:shadow-lg transition-all cursor-default"
                  style={{ background: m.bg, border: `2px solid ${m.color}35` }}>
                  <span className="text-4xl">{m.emoji}</span>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: m.color, fontFamily: "'Fredoka', sans-serif", fontSize: "1rem" }}>
                      {m.name}
                    </p>
                    <p className="text-xs mt-1 text-[#6B6358] leading-snug">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SESIONES */}
        <section id="sesiones" className="py-20 bg-[#FEFAF4]">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2.5rem", color: "#2C2416", fontWeight: 600 }}>
                Tipos de sesión
              </h2>
              <p className="mt-2 text-[#6B6358]">Elegí la experiencia que más se adapta a vos</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sesión Abierta */}
              <div className="rounded-3xl overflow-hidden shadow-sm border-2 hover:shadow-lg transition-shadow"
                style={{ borderColor: "#FFCC0060" }}>
                <div className="h-3" style={{ background: "linear-gradient(90deg, #FFCC00, #F5834A)" }} />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">🎭</span>
                    <div>
                      <h3 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.5rem", color: "#2C2416" }}>
                        Sesión Abierta
                      </h3>
                      <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#F5834A" }}>
                        Juego libre
                      </span>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2.5 mb-6">
                    {[
                      "Acceso a todos los mundos LUMA",
                      "Duración: 2 horas",
                      "Máx. 25 niños por sesión",
                      "Cafetería disponible para adultos",
                      "Estacionamiento de coches",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-[#2C2416]">
                        <Star size={13} className="text-[#FFCC00] shrink-0" fill="#FFCC00" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-[#6B6358] mb-0.5">Precio por niño</p>
                      <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2rem", color: "#2C2416" }}>
                        A consultar
                      </p>
                    </div>
                    <Link href="/reservar?tipo=open"
                      className="px-5 py-2.5 rounded-full font-bold text-sm text-[#2C2416]"
                      style={{ background: "linear-gradient(135deg, #FFCC00, #F5834A)" }}>
                      Reservar
                    </Link>
                  </div>
                </div>
              </div>

              {/* Fiesta Privada */}
              <div className="rounded-3xl overflow-hidden shadow-sm border-2 hover:shadow-lg transition-shadow relative"
                style={{ borderColor: "#4ABFB560" }}>
                <div className="h-3" style={{ background: "linear-gradient(90deg, #4ABFB5, #8DC63F)" }} />
                <div className="absolute top-6 right-6">
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: "#E05A3A" }}>
                    Exclusivo
                  </span>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">🎉</span>
                    <div>
                      <h3 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.5rem", color: "#2C2416" }}>
                        Fiesta Privada
                      </h3>
                      <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#4ABFB5" }}>
                        Espacio exclusivo
                      </span>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2.5 mb-6">
                    {[
                      "Todo el espacio para tu grupo",
                      "Duración: 3 horas",
                      "Hasta 25 niños invitados",
                      "Zona de celebración incluida",
                      "Coordinación personalizada",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-[#2C2416]">
                        <Star size={13} className="text-[#4ABFB5] shrink-0" fill="#4ABFB5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-[#6B6358] mb-0.5">Desde</p>
                      <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2rem", color: "#2C2416" }}>
                        Cotizar
                      </p>
                    </div>
                    <Link href="/reservar?tipo=party"
                      className="px-5 py-2.5 rounded-full font-bold text-sm text-white"
                      style={{ background: "linear-gradient(135deg, #4ABFB5, #8DC63F)" }}>
                      Consultar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CAFETERÍA BANNER */}
        <section className="py-16" style={{ background: "linear-gradient(135deg, #2C2416 0%, #3d3220 100%)" }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="text-5xl mb-4">☕</div>
            <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2.2rem", color: "#FFCC00", fontWeight: 600 }}>
              Cafetería & Lounge
            </h2>
            <p className="mt-3 text-lg max-w-xl mx-auto" style={{ color: "rgba(254,250,244,0.8)" }}>
              Mientras los niños orbitan sus mundos, vos disfrutás de un buen café con vista completa al espacio de juego. Porque tu momento también importa.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              {[
                { icon: <Coffee size={20} />, label: "Café de especialidad" },
                { icon: <Smile size={20} />, label: "Vista al área de juego" },
                { icon: <Shield size={20} />, label: "Sin perder a los niños de vista" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2.5 text-sm font-medium"
                  style={{ color: "rgba(254,250,244,0.75)" }}>
                  <span style={{ color: "#4ABFB5" }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 bg-[#FEFAF4]">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2.5rem", color: "#2C2416", fontWeight: 600 }}>
                Preguntas frecuentes
              </h2>
            </div>
            <div className="rounded-3xl overflow-hidden border" style={{ borderColor: "#FFCC0030", background: "white" }}>
              <div className="px-8 py-2">
                {FAQS.map((faq) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-20 relative overflow-hidden"
          style={{ background: "linear-gradient(160deg, #FFF9E6, #FFF0D8)" }}>
          <div className="absolute inset-0 dot-pattern opacity-50" />
          <div className="relative max-w-2xl mx-auto px-4 text-center">
            <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2.8rem", color: "#2C2416", fontWeight: 600 }}>
              ¿Listo para la aventura?
            </h2>
            <p className="mt-3 text-lg text-[#6B6358]">
              Asegurá el cupo de tus pequeños hoy. Los mundos los están esperando.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/reservar"
                className="px-8 py-4 rounded-full font-bold text-lg text-[#2C2416] shadow-xl hover:scale-105 transition-transform"
                style={{ background: "linear-gradient(135deg, #FFCC00, #F5834A)" }}>
                Reservar mi sesión
              </Link>
              <Link href="/checkin"
                className="px-8 py-4 rounded-full font-semibold text-lg border-2 hover:bg-[#4ABFB510] transition-colors"
                style={{ borderColor: "#4ABFB5", color: "#4ABFB5" }}>
                Tengo una reserva →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
