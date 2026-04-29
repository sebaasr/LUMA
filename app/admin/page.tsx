"use client";

import { useState } from "react";
import Link from "next/link";
import { LumaLogo } from "@/components/LumaLogo";
import { useReservations } from "@/lib/store";
import { Reservation, TIME_SLOTS, TODAY, MAX_CAPACITY } from "@/lib/data";
import { formatDate, getInitials, capacityColor } from "@/lib/utils";
import {
  Users, Clock, CheckSquare, CalendarDays, Search, Check, X,
  TrendingUp, LogOut, Settings, Bell, ChevronRight, QrCode,
  Home, LayoutDashboard, BarChart3, Menu
} from "lucide-react";

function StatCard({ label, value, sub, color, icon }: {
  label: string; value: string | number; sub?: string; color: string; icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl p-5 flex items-start gap-4"
      style={{ background: "white", border: "1.5px solid #F0EBE3" }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${color}20` }}>
        <span style={{ color }}>{icon}</span>
      </div>
      <div>
        <p className="text-2xl font-bold" style={{ fontFamily: "'Fredoka', sans-serif", color: "#2C2416" }}>
          {value}
        </p>
        <p className="text-xs font-semibold text-[#6B6358]">{label}</p>
        {sub && <p className="text-xs text-[#A09080] mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function SessionCard({ slotId, slotLabel, reservations }: {
  slotId: string; slotLabel: string; reservations: Reservation[];
}) {
  const slot = TIME_SLOTS.find((s) => s.id === slotId);
  if (!slot) return null;
  const confirmed = reservations.filter((r) => r.status !== "cancelled");
  const checkedIn = confirmed.filter((r) => r.status === "checked-in");
  const totalChildren = confirmed.reduce((sum, r) => sum + r.children.length, 0);
  const checkedInChildren = confirmed
    .filter((r) => r.status === "checked-in")
    .reduce((sum, r) => sum + r.children.length, 0);
  const pct = Math.min(100, (slot.booked / MAX_CAPACITY) * 100);
  const barColor = capacityColor(slot.booked, MAX_CAPACITY);

  return (
    <div className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "#F0EBE3", background: "white" }}>
      <div className="px-5 py-4 flex items-center justify-between border-b"
        style={{ borderColor: "#F5F0EA" }}>
        <div>
          <p className="font-semibold text-[#2C2416]" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            {slotLabel}
          </p>
          <p className="text-xs text-[#A09080]">
            {slot.type === "open" ? "Sesión abierta" : "Fiesta privada"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold" style={{ color: barColor, fontFamily: "'Fredoka', sans-serif" }}>
            {Math.max(0, MAX_CAPACITY - slot.booked)}
          </p>
          <p className="text-xs text-[#A09080]">cupos libres</p>
        </div>
      </div>
      <div className="px-5 py-3">
        <div className="h-2 rounded-full bg-[#F0EBE3] overflow-hidden mb-3">
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: barColor }} />
        </div>
        <div className="flex gap-4 text-xs">
          <span className="text-[#6B6358]"><strong className="text-[#2C2416]">{confirmed.length}</strong> reservas</span>
          <span className="text-[#6B6358]"><strong className="text-[#8DC63F]">{checkedIn.length}</strong> con check-in</span>
          <span className="text-[#6B6358]"><strong className="text-[#2C2416]">{totalChildren}</strong> niños</span>
        </div>
        {confirmed.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {confirmed.map((r) => (
              <div key={r.id}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                style={{
                  background: r.status === "checked-in" ? "#8DC63F15" : "#FFCC0015",
                  color: r.status === "checked-in" ? "#5a9a20" : "#A08020",
                  border: `1px solid ${r.status === "checked-in" ? "#8DC63F30" : "#FFCC0030"}`,
                }}>
                {r.status === "checked-in" ? <Check size={10} /> : <Clock size={10} />}
                {r.parentName.split(" ")[0]} ({r.children.length})
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { reservations, checkIn, cancelReservation } = useReservations();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "confirmed" | "checked-in" | "cancelled">("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const todayReservations = reservations.filter((r) => r.date === TODAY);
  const confirmed = todayReservations.filter((r) => r.status === "confirmed");
  const checkedIn = todayReservations.filter((r) => r.status === "checked-in");
  const cancelled = todayReservations.filter((r) => r.status === "cancelled");
  const totalChildren = todayReservations
    .filter((r) => r.status !== "cancelled")
    .reduce((sum, r) => sum + r.children.length, 0);
  const checkedInChildren = checkedIn.reduce((sum, r) => sum + r.children.length, 0);
  const availableSpots = MAX_CAPACITY - totalChildren;

  const filtered = todayReservations.filter((r) => {
    const matchQuery = !searchQuery ||
      r.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.children.some((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    return matchQuery && matchStatus;
  });

  // Group by slot for timeline
  const slotGroups = TIME_SLOTS
    .filter((s) => s.type === "open")
    .map((s) => ({
      slotId: s.id,
      slotLabel: s.label,
      reservations: todayReservations.filter((r) => r.slotId === s.id),
    }))
    .filter((g) => g.reservations.length > 0 || TIME_SLOTS.find(s => s.id === g.slotId)!.booked > 0);

  const now = new Date();

  return (
    <div className="min-h-screen flex" style={{ background: "#F5F0E8" }}>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 md:relative md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`} style={{ background: "#2C2416" }}>
        <div className="p-5 border-b" style={{ borderColor: "rgba(255,204,0,0.12)" }}>
          <div className="inline-block px-3 py-2 rounded-xl" style={{ background: "#FAF0E8" }}>
            <LumaLogo size="xs" />
          </div>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider"
            style={{ color: "rgba(254,250,244,0.4)" }}>
            Panel de Administración
          </p>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {[
            { icon: <LayoutDashboard size={16} />, label: "Dashboard", active: true },
            { icon: <CalendarDays size={16} />, label: "Reservas" },
            { icon: <QrCode size={16} />, label: "Check-in" },
            { icon: <BarChart3 size={16} />, label: "Reportes" },
            { icon: <Settings size={16} />, label: "Configuración" },
          ].map((item) => (
            <button key={item.label}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-left w-full ${
                item.active ? "text-[#2C2416]" : "hover:bg-white/10"
              }`}
              style={{
                background: item.active ? "#FFCC00" : "transparent",
                color: item.active ? "#2C2416" : "rgba(254,250,244,0.65)",
              }}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t" style={{ borderColor: "rgba(255,204,0,0.12)" }}>
          <Link href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm w-full transition-colors hover:bg-white/10"
            style={{ color: "rgba(254,250,244,0.5)" }}>
            <Home size={15} /> Ver sitio público
          </Link>
          <Link href="/checkin"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm w-full transition-colors hover:bg-white/10"
            style={{ color: "rgba(254,250,244,0.5)" }}>
            <QrCode size={15} /> Kiosko check-in
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b"
          style={{ background: "white", borderColor: "#F0EBE3" }}>
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-lg" onClick={() => setSidebarOpen(true)}
              style={{ background: "#F5F0E8" }}>
              <Menu size={18} className="text-[#2C2416]" />
            </button>
            <div>
              <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.4rem", color: "#2C2416", lineHeight: 1 }}>
                Dashboard
              </h1>
              <p className="text-xs text-[#A09080] capitalize">
                {now.toLocaleDateString("es-CR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2.5 rounded-xl hover:bg-[#F5F0E8] transition-colors">
              <Bell size={18} className="text-[#6B6358]" />
              {confirmed.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                  style={{ background: "#E05A3A" }} />
              )}
            </button>
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ background: "#FFCC00", color: "#2C2416", fontFamily: "'Fredoka', sans-serif" }}>
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Reservas hoy"
              value={todayReservations.filter((r) => r.status !== "cancelled").length}
              sub={`${cancelled.length} canceladas`}
              color="#FFCC00"
              icon={<CalendarDays size={22} />}
            />
            <StatCard
              label="Niños esperados"
              value={totalChildren}
              sub={totalChildren === 1 ? "niño registrado" : "niños registrados"}
              color="#F5834A"
              icon={<Users size={22} />}
            />
            <StatCard
              label="Cupos disponibles"
              value={Math.max(0, availableSpots)}
              sub={availableSpots <= 3 ? "¡Casi lleno!" : "Disponibles hoy"}
              color={availableSpots <= 5 ? "#E05A3A" : "#8DC63F"}
              icon={<TrendingUp size={22} />}
            />
            <StatCard
              label="Check-in realizado"
              value={checkedIn.length}
              sub={`${checkedInChildren} niños adentro`}
              color="#4ABFB5"
              icon={<CheckSquare size={22} />}
            />
          </div>

          {/* Timeline */}
          <section>
            <h2 className="text-base font-semibold text-[#2C2416] mb-3"
              style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.2rem" }}>
              Sesiones de hoy
            </h2>
            {slotGroups.length === 0 ? (
              <div className="rounded-2xl p-8 text-center border"
                style={{ borderColor: "#F0EBE3", background: "white" }}>
                <p className="text-[#A09080] text-sm">No hay reservas para hoy.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {slotGroups.map((g) => (
                  <SessionCard key={g.slotId} {...g} />
                ))}
              </div>
            )}
          </section>

          {/* Reservations table */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.2rem", color: "#2C2416" }}>
                Lista de reservas
              </h2>
              <div className="flex gap-2 flex-wrap">
                {(["all", "confirmed", "checked-in", "cancelled"] as const).map((s) => (
                  <button key={s} onClick={() => setFilterStatus(s)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                    style={{
                      background: filterStatus === s ? "#FFCC00" : "white",
                      color: filterStatus === s ? "#2C2416" : "#6B6358",
                      border: `1.5px solid ${filterStatus === s ? "#FFCC00" : "#E8E0D5"}`,
                    }}>
                    {s === "all" ? "Todas" : s === "confirmed" ? "Pendientes" : s === "checked-in" ? "Ingresaron" : "Canceladas"}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A09080]" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, código, niño..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none"
                style={{ borderColor: "#E8E0D5", background: "white", color: "#2C2416" }}
                onFocus={(e) => e.target.style.borderColor = "#FFCC00"}
                onBlur={(e) => e.target.style.borderColor = "#E8E0D5"}
              />
            </div>

            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#F0EBE3" }}>
              {filtered.length === 0 ? (
                <div className="py-10 text-center bg-white">
                  <p className="text-[#A09080] text-sm">No hay resultados para tu búsqueda.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm bg-white">
                    <thead>
                      <tr style={{ background: "#F9F5EE", borderBottom: "1.5px solid #F0EBE3" }}>
                        {["Código", "Responsable", "Turno", "Niños", "Tipo", "Estado", "Acción"].map((h) => (
                          <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#A09080]">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: "#F5F0EA" }}>
                      {filtered.map((r) => (
                        <tr key={r.id} className="hover:bg-[#FEFAF4] transition-colors">
                          <td className="px-5 py-4">
                            <span className="font-mono font-bold text-xs" style={{ color: "#F5834A" }}>
                              {r.bookingCode}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                                style={{ background: "#FFCC0025", color: "#C8956C" }}>
                                {getInitials(r.parentName)}
                              </div>
                              <div>
                                <p className="font-semibold text-[#2C2416]">{r.parentName}</p>
                                <p className="text-xs text-[#A09080]">{r.parentPhone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="font-medium text-[#2C2416]">{r.slotTime} – {r.slotEndTime}</span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex flex-col gap-0.5">
                              {r.children.map((c, i) => (
                                <span key={i} className="text-xs text-[#6B6358]">
                                  {c.name}, {c.age === 0 ? "< 1" : c.age}a
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                              style={{
                                background: r.sessionType === "open" ? "#FFCC0015" : "#4ABFB515",
                                color: r.sessionType === "open" ? "#A08020" : "#2a9490",
                              }}>
                              {r.sessionType === "open" ? "Abierta" : "Privada"}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold`}
                              style={{
                                background:
                                  r.status === "confirmed" ? "#FFCC0015" :
                                  r.status === "checked-in" ? "#8DC63F15" : "#E05A3A15",
                                color:
                                  r.status === "confirmed" ? "#A08020" :
                                  r.status === "checked-in" ? "#5a9a20" : "#E05A3A",
                              }}>
                              {r.status === "confirmed" ? "Pendiente" :
                               r.status === "checked-in" ? "Ingresó" : "Cancelada"}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            {r.status === "confirmed" && (
                              <div className="flex gap-1.5">
                                <button onClick={() => checkIn(r.id)}
                                  className="p-1.5 rounded-lg hover:bg-[#8DC63F15] text-[#8DC63F] transition-colors"
                                  title="Check-in">
                                  <Check size={15} />
                                </button>
                                <button onClick={() => cancelReservation(r.id)}
                                  className="p-1.5 rounded-lg hover:bg-[#E05A3A15] text-[#E05A3A] transition-colors"
                                  title="Cancelar">
                                  <X size={15} />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <p className="text-xs text-[#A09080] mt-2 text-right">
              Mostrando {filtered.length} de {todayReservations.length} reservas para hoy
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
