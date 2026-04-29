"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LumaLogo } from "./LumaLogo";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/#mundos", label: "Los Mundos" },
  { href: "/#sesiones", label: "Sesiones" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <header className="sticky top-0 z-50 bg-[#FEFAF4]/95 backdrop-blur border-b border-[#FFCC00]/30 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" onClick={() => setOpen(false)}>
          <LumaLogo size="sm" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className="text-sm font-medium text-[#6B6358] hover:text-[#2C2416] transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/checkin"
            className="text-sm font-medium text-[#4ABFB5] hover:text-[#3aada3] transition-colors">
            Check-in
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/reservar"
            className="px-5 py-2 rounded-full font-semibold text-sm text-[#2C2416] transition-all hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #FFCC00, #F5834A)" }}>
            Reservar
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 rounded-lg text-[#2C2416]" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#FFCC00]/20 bg-[#FEFAF4] px-4 pb-4">
          <nav className="flex flex-col gap-3 pt-4">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="text-base font-medium text-[#6B6358] hover:text-[#2C2416]">
                {l.label}
              </Link>
            ))}
            <Link href="/checkin" onClick={() => setOpen(false)}
              className="text-base font-medium text-[#4ABFB5]">
              Check-in
            </Link>
            <Link href="/reservar" onClick={() => setOpen(false)}
              className="mt-2 px-5 py-2.5 rounded-full font-semibold text-sm text-center text-[#2C2416]"
              style={{ background: "linear-gradient(135deg, #FFCC00, #F5834A)" }}>
              Reservar ahora
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
