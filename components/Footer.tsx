import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer>
      {/* Stripe texture band */}
      <div className="h-5 luma-tex-stripes" />

      {/* Logo section — cream bg so the logo PNG works cleanly */}
      <div style={{ background: "#FAF0E8" }} className="px-5 pt-10 pb-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start gap-10">

          <div className="shrink-0">
            <Image src="/brand/LumaLogo.png" alt="LUMA Coffee and Play" width={160} height={90} style={{ objectFit: "contain" }} />
            <p className="mt-3 text-sm leading-relaxed text-[#6B6358] max-w-xs">
              Un espacio donde ellos juegan…<br />y vos sos feliz.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 flex-1">
            <div>
              <h4 className="text-base font-bold mb-4 text-[#2C2416]" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                Visítanos
              </h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-sm text-[#6B6358]">
                  <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "#80C4B0" }} />
                  <span>Curridabat, San José · Costa Rica</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-[#6B6358]">
                  <Clock size={14} className="mt-0.5 shrink-0" style={{ color: "#80C4B0" }} />
                  <span>Lunes a Domingo · 9:00 am – 5:00 pm</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-base font-bold mb-4 text-[#2C2416]" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                Acceso rápido
              </h4>
              <nav className="flex flex-col gap-2">
                {[
                  { href: "/reservar",  label: "Reservar sesión"   },
                  { href: "/#mundos",   label: "Los Mundos LUMA"   },
                  { href: "/#sesiones", label: "Sesiones y precios" },
                  { href: "/checkin",   label: "Check-in en sitio" },
                  { href: "/admin",     label: "Panel de admin"    },
                ].map((l) => (
                  <Link key={l.href} href={l.href}
                    className="text-sm text-[#6B6358] hover:text-[#2C2416] transition-colors">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ background: "#2C2416" }} className="px-5 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 text-xs"
          style={{ color: "rgba(254,240,232,0.4)" }}>
          <span>© 2026 LUMA Coffee & Play. Todos los derechos reservados.</span>
          <span>Identidad gráfica: Laura Vásquez · Francē Interiorismo</span>
        </div>
      </div>
    </footer>
  );
}
