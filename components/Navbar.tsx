"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LumaLogo } from "./LumaLogo";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#mundos",   label: "Los Mundos" },
  { href: "/#sesiones", label: "Sesiones"   },
  { href: "/#faq",      label: "FAQ"        },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  if (pathname.startsWith("/admin") || pathname.startsWith("/checkin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b" style={{ background: "#FAF0E8", borderColor: "#EDCC3D40" }}>
      <div className="max-w-6xl mx-auto px-5 h-[68px] flex items-center justify-between">
        <Link href="/" onClick={() => setOpen(false)}>
          <LumaLogo size="sm" />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className="text-sm font-semibold text-[#6B6358] hover:text-[#2C2416] transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/checkin" className="text-sm font-semibold transition-colors"
            style={{ color: "#80C4B0" }}>
            Check-in
          </Link>
        </nav>

        <div className="hidden md:flex">
          <Link href="/reservar"
            className="px-5 py-2.5 rounded-full font-bold text-sm text-[#2C2416] hover:opacity-90 transition-opacity shadow-sm"
            style={{ background: "#EDCC3D" }}>
            Reservar
          </Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={22} className="text-[#2C2416]" /> : <Menu size={22} className="text-[#2C2416]" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t px-5 pb-5" style={{ background: "#FAF0E8", borderColor: "#EDCC3D30" }}>
          <nav className="flex flex-col gap-4 pt-4">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="text-base font-semibold text-[#6B6358]">{l.label}</Link>
            ))}
            <Link href="/checkin" onClick={() => setOpen(false)}
              className="text-base font-semibold" style={{ color: "#80C4B0" }}>
              Check-in
            </Link>
            <Link href="/reservar" onClick={() => setOpen(false)}
              className="mt-1 px-5 py-3 rounded-full font-bold text-sm text-center text-[#2C2416]"
              style={{ background: "#EDCC3D" }}>
              Reservar ahora
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
