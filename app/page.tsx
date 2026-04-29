"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LumaLogo } from "@/components/LumaLogo";
import { MUNDOS } from "@/lib/data";
import { ChevronDown, ArrowRight, MapPin, Clock, Users, Shield } from "lucide-react";

/* ─── Brand asset helper ──────────────────────────────────── */
function BrandImg({
  src, alt, width, height, className, style,
}: {
  src: string; alt: string; width: number; height: number;
  className?: string; style?: React.CSSProperties;
}) {
  return (
    <Image src={src} alt={alt} width={width} height={height}
      className={className} style={{ objectFit: "contain", ...style }} />
  );
}

/* ─── FAQ ─────────────────────────────────────────────────── */
const FAQS = [
  { q: "¿Cuántos niños pueden ingresar a la vez?",   a: "LUMA tiene capacidad para 25 niños por sesión. Esto garantiza atención personalizada y un ambiente seguro para todos." },
  { q: "¿Qué edades son bienvenidas?",                a: "De 0 a 10 años. Tenemos una zona especial para bebés de 0–3 años con materiales y estímulos adaptados." },
  { q: "¿Los adultos entran al área de juego?",       a: "Pueden acompañar a sus hijos en cualquier zona. La cafetería y el lounge están pensados para que los adultos disfruten con vista completa al espacio." },
  { q: "¿Puedo cancelar o reagendar?",                a: "Podés cancelar o reagendar sin cargo hasta 24 horas antes. Pasado ese plazo aplica la política de uso." },
  { q: "¿Cómo funciona el check-in?",                 a: "Al confirmar tu reserva recibís un QR único por email. Lo escaneás en el kiosko de la entrada y listo, sin filas." },
  { q: "¿Puedo organizar una fiesta privada?",         a: "Las sesiones privadas incluyen el espacio completo por 3 horas. Coordinamos decoración, catering y actividades según tus necesidades." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: "rgba(44,36,22,0.1)" }}>
      <button className="w-full flex justify-between items-center py-5 text-left gap-6"
        onClick={() => setOpen(!open)}>
        <span className="font-semibold text-base text-[#2C2416]">{q}</span>
        <ChevronDown size={18} className="shrink-0 transition-transform" style={{ color: "#D06A44", transform: open ? "rotate(180deg)" : "none" }} />
      </button>
      {open && <p className="pb-5 text-sm leading-relaxed text-[#6B6358]">{a}</p>}
    </div>
  );
}

/* ─── PAGE ────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>

        {/* ══════════════════════════════════════════════════
            HERO  —  cream bg + real logo + brand elements
        ══════════════════════════════════════════════════ */}
        <section style={{ background: "#FAF0E8", minHeight: "92vh" }}
          className="relative flex items-center overflow-hidden">

          {/* Texture overlay — dots kawaii pattern at low opacity */}
          <div className="luma-tex-dots absolute inset-0 opacity-30" />

          {/* Floating brand elements — desktop */}
          <div className="float-a absolute top-14 left-[5%] hidden lg:block">
            <BrandImg src="/brand/elementoLuma3.png" alt="" width={100} height={70} />
          </div>
          <div className="float-b absolute top-20 right-[7%] hidden lg:block">
            <BrandImg src="/brand/elementoLuma2.png" alt="" width={80} height={90} />
          </div>
          <div className="float-c absolute bottom-20 left-[4%] hidden lg:block">
            <BrandImg src="/brand/figurativoLuma4.png" alt="" width={72} height={72} />
          </div>
          <div className="float-a absolute bottom-16 right-[5%] hidden lg:block">
            <BrandImg src="/brand/elementoLuma4.png" alt="" width={68} height={68} />
          </div>
          <div className="float-b absolute top-[42%] left-[13%] hidden xl:block">
            <BrandImg src="/brand/figurativoCorazon.png" alt="" width={52} height={48} />
          </div>
          <div className="float-c absolute top-[32%] right-[13%] hidden xl:block">
            <BrandImg src="/brand/figurativoLuma1.png" alt="" width={56} height={68} />
          </div>
          <div className="float-a absolute bottom-[32%] right-[10%] hidden xl:block">
            <BrandImg src="/brand/figurativoLuma5.png" alt="" width={58} height={58} />
          </div>
          <div className="float-b absolute bottom-[28%] left-[8%] hidden xl:block">
            <BrandImg src="/brand/figurativoLuma10.png" alt="" width={60} height={64} />
          </div>
          <div className="float-c absolute top-[18%] left-[20%] hidden xl:block">
            <BrandImg src="/brand/figurativoLuma2.png" alt="" width={44} height={44} />
          </div>
          <div className="float-a absolute top-[22%] right-[20%] hidden xl:block">
            <BrandImg src="/brand/figurativoLuma6.png" alt="" width={50} height={48} />
          </div>

          <div className="relative max-w-4xl mx-auto px-6 py-20 w-full flex flex-col items-center text-center">

            {/* Real LUMA logo — large */}
            <div className="animate-fade-up mb-6">
              <LumaLogo size="xl" />
            </div>

            {/* Open badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-7 animate-fade-up delay-1"
              style={{ background: "#80C4B020", color: "#4a9e8e", border: "1px solid #80C4B050" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#80C4B0" }} />
              Curridabat · Abierto hoy
            </div>

            <h1 className="animate-fade-up delay-2"
              style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "#2C2416", fontWeight: 600, lineHeight: 1.08, maxWidth: 640 }}>
              El espacio de juego más{" "}
              <span style={{ color: "#D06A44" }}>especial</span>{" "}
              de Curridabat
            </h1>

            <p className="mt-5 text-lg leading-relaxed max-w-xl animate-fade-up delay-3 text-[#6B6358]">
              10 mundos temáticos para explorar, cafetería para papás y mamás,
              y fiestas privadas que dejan recuerdos para toda la vida.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 justify-center animate-fade-up delay-3">
              <Link href="/reservar"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-base text-[#2C2416] hover:opacity-90 transition-opacity shadow-md"
                style={{ background: "#EDCC3D" }}>
                Reservar mi sesión <ArrowRight size={16} />
              </Link>
              <a href="#mundos"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base border-2 hover:bg-[#EDCC3D10] transition-colors"
                style={{ borderColor: "#EDCC3D", color: "#2C2416" }}>
                Ver los mundos
              </a>
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-3 justify-center animate-fade-up delay-3">
              {[
                { icon: <Users size={14} />, val: "25", label: "niños máx.", c: "#D06A44" },
                { icon: <Shield size={14} />, val: "0–10", label: "años",    c: "#B8CC6E" },
                { icon: <Clock size={14} />, val: "L–D",  label: "9am–5pm",  c: "#80C4B0" },
                { icon: <MapPin size={14} />, val: "Curridabat", label: "CR", c: "#EAB05A" },
              ].map((s) => (
                <div key={s.label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm text-sm">
                  <span style={{ color: s.c }}>{s.icon}</span>
                  <span className="font-bold text-[#2C2416]" style={{ fontFamily: "'Fredoka', sans-serif" }}>{s.val}</span>
                  <span className="text-[#6B6358] text-xs">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wave into next section */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 56" fill="none" className="w-full block">
              <path d="M0 56 Q360 0 720 28 Q1080 56 1440 12 L1440 56 Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            EXPRESIONES + TAGLINE
        ══════════════════════════════════════════════════ */}
        <section style={{ background: "white" }} className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">

              {/* 6 expresiones row */}
              <div className="flex items-center gap-2 shrink-0">
                {[
                  { src: "/brand/expresionLumaAmarilla.png", delay: "0s"   },
                  { src: "/brand/expresionLumaRoja.png",     delay: "0.5s" },
                  { src: "/brand/expresionLumaVerde.png",    delay: "1s"   },
                  { src: "/brand/expresionLumaRosa.png",     delay: "1.5s" },
                  { src: "/brand/expresionLumaCyan.png",     delay: "2s"   },
                  { src: "/brand/expresionLumaNaranja.png",  delay: "2.5s" },
                ].map((e, i) => (
                  <div key={i} className="float-b" style={{ animationDelay: e.delay }}>
                    <BrandImg src={e.src} alt="" width={58} height={58} />
                  </div>
                ))}
              </div>

              <div className="flex-1 text-center md:text-left">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#80C4B0" }}>
                  Nuestro espacio
                </p>
                <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2.2rem", color: "#2C2416", fontWeight: 600, lineHeight: 1.1 }}>
                  Play time for them,{" "}
                  <span style={{ color: "#EDCC3D" }}>coffee time</span> for you.
                </h2>
                <p className="mt-3 text-base text-[#6B6358] max-w-md leading-relaxed">
                  LUMA es el sol que reúne a los niños. Cada uno orbita libremente entre los mundos,
                  mientras los adultos disfrutan de la cafetería con vista al espacio de juego.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            CÓMO FUNCIONA  —  cream bg, brand element icons
        ══════════════════════════════════════════════════ */}
        <section style={{ background: "#FAF0E8" }} className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#D06A44" }}>
                Proceso
              </p>
              <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2.6rem", color: "#2C2416", fontWeight: 600 }}>
                Tres pasos y listo
              </h2>
              <p className="mt-2 text-base text-[#6B6358]">
                Reservar tu sesión en LUMA es rápido y sin complicaciones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  n: "01", color: "#EDCC3D", bg: "#FFFBE8",
                  img: "/brand/elementoLuma3.png", imgW: 90, imgH: 65,
                  title: "Elegís fecha y turno",
                  desc: "Seleccioná el día y la sesión. Ves los cupos disponibles en tiempo real antes de confirmar.",
                },
                {
                  n: "02", color: "#D06A44", bg: "#FDF0EA",
                  img: "/brand/elementoLuma2.png", imgW: 75, imgH: 88,
                  title: "Completás el formulario",
                  desc: "Nombre del responsable y datos de los niños. Sin cuenta, sin contraseñas, en segundos.",
                },
                {
                  n: "03", color: "#80C4B0", bg: "#EAF7F4",
                  img: "/brand/elementoLuma4.png", imgW: 80, imgH: 80,
                  title: "Check-in con QR",
                  desc: "Recibís un código QR por email. Lo escaneás al llegar y los mundos los esperan.",
                },
              ].map((s) => (
                <div key={s.n}
                  className="rounded-3xl p-8 relative overflow-hidden hover:shadow-lg transition-shadow"
                  style={{ background: s.bg, border: `2px solid ${s.color}30` }}>
                  <span className="absolute bottom-2 right-4 font-bold opacity-[0.06] leading-none select-none"
                    style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "5.5rem", color: s.color }}>
                    {s.n}
                  </span>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mb-5 text-[#2C2416]"
                    style={{ background: s.color, fontFamily: "'Fredoka', sans-serif" }}>
                    {s.n}
                  </div>
                  <div className="mb-4 h-24 flex items-end">
                    <BrandImg src={s.img} alt="" width={s.imgW} height={s.imgH} />
                  </div>
                  <h3 className="font-semibold text-xl mb-2 text-[#2C2416]"
                    style={{ fontFamily: "'Fredoka', sans-serif" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed text-[#6B6358]">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/reservar"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-[#2C2416] hover:opacity-90 transition-opacity"
                style={{ background: "#EDCC3D" }}>
                Empezar reserva <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            LOS MUNDOS  —  texturaLuma1 background
        ══════════════════════════════════════════════════ */}
        <section id="mundos" className="py-20 relative overflow-hidden" style={{ background: "white" }}>
          <div className="luma-tex-stripes h-2 absolute top-0 left-0 right-0" />

          <div className="relative max-w-6xl mx-auto px-6 pt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#EDCC3D" }}>
                  Órbitas de Luz
                </p>
                <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2.6rem", color: "#2C2416", fontWeight: 600, lineHeight: 1.05 }}>
                  Los 10 Mundos LUMA
                </h2>
                <p className="mt-2 text-base max-w-md text-[#6B6358]">
                  Cada zona tiene su propia personalidad. Los niños orbitan libremente — cada visita es un recorrido diferente.
                </p>
              </div>
              <Link href="/reservar"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-[#2C2416] hover:opacity-90"
                style={{ background: "#EDCC3D" }}>
                Reservar <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {MUNDOS.map((m) => (
                <div key={m.id}
                  className="rounded-2xl p-5 flex flex-col gap-3 hover:scale-[1.04] hover:shadow-md transition-all"
                  style={{ background: m.bg, border: `2px solid ${m.color}30` }}>
                  <div className="h-1.5 rounded-full -mt-1" style={{ background: m.color }} />
                  <div className="h-14 flex items-center">
                    <BrandImg src={m.img} alt={m.name} width={52} height={52} />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: m.color, fontFamily: "'Fredoka', sans-serif", fontSize: "1rem" }}>
                      {m.name}
                    </p>
                    <p className="text-xs mt-1 leading-snug text-[#6B6358]">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="luma-tex-stripes h-2 absolute bottom-0 left-0 right-0" />
        </section>

        {/* ══════════════════════════════════════════════════
            SESIONES  —  cream bg
        ══════════════════════════════════════════════════ */}
        <section id="sesiones" style={{ background: "#FAF0E8" }} className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#D06A44" }}>Sesiones</p>
              <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2.6rem", color: "#2C2416", fontWeight: 600 }}>
                Elegí tu experiencia
              </h2>
              <p className="mt-2 text-base text-[#6B6358]">Dos formas de vivir LUMA.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sesión Abierta */}
              <div className="rounded-3xl overflow-hidden border-2 hover:shadow-xl transition-shadow bg-white"
                style={{ borderColor: "#EDCC3D50" }}>
                <div className="px-8 pt-8 pb-6 relative overflow-hidden"
                  style={{ background: "#FFFBE8" }}>
                  <div className="absolute right-4 bottom-0 opacity-30">
                    <BrandImg src="/brand/figurativoLuma2.png" alt="" width={80} height={80} />
                  </div>
                  <div className="mb-4">
                    <BrandImg src="/brand/expresionLumaAmarilla.png" alt="" width={64} height={64} />
                  </div>
                  <h3 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.9rem", color: "#2C2416" }}>
                    Sesión Abierta
                  </h3>
                  <p className="text-sm font-bold uppercase tracking-wide mt-1" style={{ color: "#A08820" }}>
                    Juego libre · 2 horas
                  </p>
                </div>
                <div className="px-8 py-6">
                  <ul className="space-y-3 mb-7">
                    {["Acceso a los 10 mundos LUMA", "Hasta 25 niños por sesión", "Cafetería disponible para adultos", "Estacionamiento de coches", "Zona bebés 0–3 años incluida"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-[#2C2416]">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-[#2C2416]"
                          style={{ background: "#EDCC3D" }}>✓</div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-end justify-between pt-4 border-t border-[#F0EBE0]">
                    <div>
                      <p className="text-xs text-[#A09080] mb-0.5">Por niño</p>
                      <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.8rem", color: "#2C2416" }}>A consultar</p>
                    </div>
                    <Link href="/reservar?tipo=open"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-[#2C2416] hover:opacity-90"
                      style={{ background: "#EDCC3D" }}>
                      Reservar <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Fiesta Privada */}
              <div className="rounded-3xl overflow-hidden border-2 hover:shadow-xl transition-shadow bg-white relative"
                style={{ borderColor: "#80C4B050" }}>
                <div className="absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-bold text-white z-10"
                  style={{ background: "#D06A44" }}>
                  Exclusivo
                </div>
                <div className="px-8 pt-8 pb-6 relative overflow-hidden"
                  style={{ background: "#EAF7F4" }}>
                  <div className="absolute right-4 bottom-0 opacity-25">
                    <BrandImg src="/brand/elementoLuma2.png" alt="" width={80} height={90} />
                  </div>
                  <div className="mb-4">
                    <BrandImg src="/brand/expresionLumaRoja.png" alt="" width={64} height={64} />
                  </div>
                  <h3 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.9rem", color: "#2C2416" }}>
                    Fiesta Privada
                  </h3>
                  <p className="text-sm font-bold uppercase tracking-wide mt-1" style={{ color: "#3a8878" }}>
                    Espacio exclusivo · 3 horas
                  </p>
                </div>
                <div className="px-8 py-6">
                  <ul className="space-y-3 mb-7">
                    {["Todo el espacio para tu grupo", "Hasta 25 invitados", "Zona de celebración incluida", "Coordinación personalizada", "Decoración y catering disponible"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-[#2C2416]">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-white"
                          style={{ background: "#80C4B0" }}>✓</div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-end justify-between pt-4 border-t border-[#F0EBE0]">
                    <div>
                      <p className="text-xs text-[#A09080] mb-0.5">Desde</p>
                      <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.8rem", color: "#2C2416" }}>Cotizar</p>
                    </div>
                    <Link href="/reservar?tipo=party"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white hover:opacity-90"
                      style={{ background: "#80C4B0" }}>
                      Consultar <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            CAFETERÍA  —  texturaLuma3 background
        ══════════════════════════════════════════════════ */}
        <section className="py-20 relative overflow-hidden" style={{ background: "white" }}>
          {/* Subtle texture bg */}
          <div className="luma-tex-elements absolute inset-0 opacity-[0.07]" />

          <div className="relative max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#80C4B0" }}>
                  Cafetería & Lounge
                </p>
                <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2.6rem", color: "#2C2416", fontWeight: 600, lineHeight: 1.05 }}>
                  Tu momento también importa
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-[#6B6358]">
                  Mientras los niños orbitan sus mundos, vos disfrutás de un buen café con vista completa al espacio de juego.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { img: "/brand/elementoLuma4.png", w: 36, h: 36, label: "Café de especialidad"   },
                    { img: "/brand/figurativoLuma1.png", w: 30, h: 38, label: "Vista al área de juego" },
                    { img: "/brand/figurativoCorazon.png", w: 34, h: 30, label: "Lounge para adultos"    },
                    { img: "/brand/elementoLuma1.png", w: 34, h: 40, label: "Menú ligero disponible"  },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 text-sm font-medium text-[#2C2416]">
                      <div className="w-10 shrink-0 flex items-center">
                        <BrandImg src={item.img} alt="" width={item.w} height={item.h} />
                      </div>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Brand elements showcase grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { src: "/brand/elementoLuma1.png",    bg: "#EAF7F4", w: 80,  h: 95  },
                  { src: "/brand/elementoLuma2.png",    bg: "#FDF0EA", w: 75,  h: 88  },
                  { src: "/brand/elementoLuma3.png",    bg: "#FDEEF5", w: 100, h: 70  },
                  { src: "/brand/elementoLuma4.png",    bg: "#F4F9E4", w: 80,  h: 80  },
                ].map((item, i) => (
                  <div key={i}
                    className="rounded-2xl flex items-center justify-center p-6 aspect-square"
                    style={{ background: item.bg }}>
                    <BrandImg src={item.src} alt="" width={item.w} height={item.h} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            FIGURATIVOS  —  brand shapes showcase
        ══════════════════════════════════════════════════ */}
        <section style={{ background: "#FAF0E8" }} className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.8rem", color: "#2C2416" }}>
                Un universo visual hecho para jugar
              </h2>
              <p className="text-sm text-[#6B6358] mt-1">
                Cada rincón del espacio respira la identidad LUMA
              </p>
            </div>

            {/* Figurativos row */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {[
                "/brand/figurativoLuma1.png",
                "/brand/figurativoLuma2.png",
                "/brand/figurativoLuma3.png",
                "/brand/figurativoLuma4.png",
                "/brand/figurativoLuma5.png",
                "/brand/figurativoLuma6.png",
                "/brand/figurativoLuma7.png",
                "/brand/figurativoLuma8.png",
                "/brand/figurativoLuma9.png",
                "/brand/figurativoLuma10.png",
                "/brand/figurativoCorazon.png",
              ].map((src, i) => (
                <div key={i}
                  className="w-16 h-16 flex items-center justify-center hover:scale-110 transition-transform">
                  <BrandImg src={src} alt="" width={54} height={54} />
                </div>
              ))}
            </div>

            {/* Texture strip */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-[#E8DDD4]">
              <Image
                src="/brand/texturaLuma1.png"
                alt="Textura LUMA — patrón de círculos kawaii"
                width={1200} height={300}
                className="w-full h-36 object-cover"
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════════════ */}
        <section id="faq" style={{ background: "white" }} className="py-20">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#B8CC6E" }}>FAQ</p>
              <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2.6rem", color: "#2C2416", fontWeight: 600 }}>
                Preguntas frecuentes
              </h2>
            </div>
            <div className="rounded-3xl overflow-hidden border-2 bg-white" style={{ borderColor: "#F0EBE0" }}>
              <div className="px-8">
                {FAQS.map((faq) => <FaqItem key={faq.q} {...faq} />)}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            CTA FINAL  —  amarillo de marca
        ══════════════════════════════════════════════════ */}
        <section style={{ background: "#EDCC3D" }} className="py-24 relative overflow-hidden">
          {/* Figurativos decoration */}
          <div className="absolute left-[4%] top-1/2 -translate-y-1/2 opacity-25 hidden lg:block float-b">
            <BrandImg src="/brand/figurativoLuma7.png" alt="" width={120} height={54} />
          </div>
          <div className="absolute right-[4%] top-1/2 -translate-y-1/2 opacity-25 hidden lg:block float-a">
            <BrandImg src="/brand/figurativoLuma9.png" alt="" width={100} height={55} />
          </div>
          <div className="absolute bottom-4 left-[15%] opacity-15 hidden xl:block">
            <BrandImg src="/brand/figurativoLuma8.png" alt="" width={100} height={44} />
          </div>
          <div className="absolute bottom-4 right-[15%] opacity-15 hidden xl:block">
            <BrandImg src="/brand/figurativoLuma8.png" alt="" width={100} height={44} />
          </div>

          <div className="relative max-w-2xl mx-auto px-6 text-center">
            {/* Expresión principal sobre fondo amarillo */}
            <div className="flex justify-center mb-6">
              <div className="float-b">
                <BrandImg src="/brand/expresionLumaAmarilla.png" alt="" width={80} height={80} />
              </div>
            </div>
            <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", color: "#2C2416", fontWeight: 600, lineHeight: 1.08 }}>
              Los mundos están esperando a tus pequeños
            </h2>
            <p className="mt-4 text-lg" style={{ color: "rgba(44,36,22,0.65)" }}>
              Asegurá el cupo hoy. Los turnos se llenan rápido.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/reservar"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-lg text-[#FAF0E8] hover:opacity-90 transition-opacity shadow-xl"
                style={{ background: "#2C2416" }}>
                Reservar mi sesión <ArrowRight size={18} />
              </Link>
              <Link href="/checkin"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg border-2 hover:bg-black/5 transition-colors"
                style={{ borderColor: "rgba(44,36,22,0.3)", color: "#2C2416" }}>
                Ya tengo reserva →
              </Link>
            </div>
          </div>

          <div className="luma-tex-stripes h-3 absolute bottom-0 left-0 right-0" />
        </section>

      </main>
      <Footer />
    </div>
  );
}
