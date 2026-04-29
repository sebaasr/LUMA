import Link from "next/link";
import { LumaLogo } from "./LumaLogo";
import { MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ background: "#2C2416" }} className="text-white">
      {/* Wave top */}
      <div className="h-12 overflow-hidden" style={{ background: "#FEFAF4" }}>
        <svg viewBox="0 0 1440 48" fill="none" className="w-full h-full">
          <path d="M0 0 Q360 48 720 24 Q1080 0 1440 48 L1440 0 Z" fill="#2C2416" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <LumaLogo size="md" variant="light" />
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(254,250,244,0.65)" }}>
              Un espacio donde ellos juegan…<br />y vos sos feliz.
            </p>
            <a href="https://instagram.com/luma" target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:text-[#FFCC00] transition-colors"
              style={{ color: "#4ABFB5" }}>
              <span>@</span>
              @luma
            </a>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4" style={{ fontFamily: "'Fredoka', sans-serif", color: "#FFCC00" }}>
              Visítanos
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(254,250,244,0.75)" }}>
                <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: "#4ABFB5" }} />
                <span>Curridabat, San José<br />Costa Rica</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(254,250,244,0.75)" }}>
                <Clock size={15} className="mt-0.5 shrink-0" style={{ color: "#4ABFB5" }} />
                <span>Lunes a Domingo<br />9:00 am – 5:00 pm</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4" style={{ fontFamily: "'Fredoka', sans-serif", color: "#FFCC00" }}>
              Acceso rápido
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/reservar", label: "Reservar sesión" },
                { href: "/#mundos", label: "Los Mundos LUMA" },
                { href: "/#sesiones", label: "Sesiones y precios" },
                { href: "/checkin", label: "Check-in en sitio" },
                { href: "/admin", label: "Panel de admin" },
              ].map((l) => (
                <Link key={l.href} href={l.href}
                  className="text-sm hover:text-[#FFCC00] transition-colors"
                  style={{ color: "rgba(254,250,244,0.65)" }}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-2 text-xs"
          style={{ borderColor: "rgba(255,204,0,0.15)", color: "rgba(254,250,244,0.4)" }}>
          <span>© 2026 LUMA Coffee & Play. Todos los derechos reservados.</span>
          <span>Diseño de espacio: Francē Interiorismo</span>
        </div>
      </div>
    </footer>
  );
}
