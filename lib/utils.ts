import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("es-CR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

export function capacityColor(booked: number, capacity: number): string {
  const pct = booked / capacity;
  if (pct >= 1) return "#E05A3A";
  if (pct >= 0.8) return "#F5834A";
  return "#8DC63F";
}

export function capacityLabel(booked: number, capacity: number): string {
  const available = capacity - booked;
  if (available <= 0) return "Sin cupos";
  if (available <= 3) return `¡Solo ${available} cupo${available > 1 ? "s" : ""}!`;
  return `${available} cupos disponibles`;
}

export function getInitials(name: string): string {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}
