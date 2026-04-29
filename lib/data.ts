export type SessionType = "open" | "party";
export type ReservationStatus = "confirmed" | "checked-in" | "cancelled";

export interface Child {
  name: string;
  age: number;
}

export interface TimeSlot {
  id: string;
  time: string;
  endTime: string;
  label: string;
  type: SessionType;
  capacity: number;
  booked: number;
}

export interface Reservation {
  id: string;
  bookingCode: string;
  date: string;
  slotId: string;
  slotTime: string;
  slotEndTime: string;
  sessionType: SessionType;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  children: Child[];
  status: ReservationStatus;
  createdAt: string;
}

export const MAX_CAPACITY = 25;

export const TIME_SLOTS: TimeSlot[] = [
  { id: "s1", time: "09:00", endTime: "11:00", label: "9:00 – 11:00 am", type: "open",  capacity: 25, booked: 18 },
  { id: "s2", time: "11:30", endTime: "13:30", label: "11:30 am – 1:30 pm", type: "open",  capacity: 25, booked: 7  },
  { id: "s3", time: "14:00", endTime: "16:00", label: "2:00 – 4:00 pm",   type: "open",  capacity: 25, booked: 25 },
  { id: "s4", time: "16:30", endTime: "18:30", label: "4:30 – 6:30 pm",   type: "open",  capacity: 25, booked: 3  },
  { id: "p1", time: "09:00", endTime: "12:00", label: "9:00 am – 12:00 pm (mañana)", type: "party", capacity: 25, booked: 25 },
  { id: "p2", time: "13:00", endTime: "16:00", label: "1:00 – 4:00 pm (tarde)",      type: "party", capacity: 25, booked: 0  },
  { id: "p3", time: "16:30", endTime: "19:30", label: "4:30 – 7:30 pm (noche)",      type: "party", capacity: 25, booked: 0  },
];

export const TODAY = new Date().toISOString().split("T")[0];

export const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: "r1", bookingCode: "LUM-4821",
    date: TODAY, slotId: "s1", slotTime: "09:00", slotEndTime: "11:00",
    sessionType: "open",
    parentName: "Andrea Mora", parentEmail: "andrea@email.com", parentPhone: "8812-3456",
    children: [{ name: "Sofía", age: 4 }, { name: "Mateo", age: 6 }],
    status: "checked-in", createdAt: new Date().toISOString(),
  },
  {
    id: "r2", bookingCode: "LUM-3317",
    date: TODAY, slotId: "s1", slotTime: "09:00", slotEndTime: "11:00",
    sessionType: "open",
    parentName: "Carlos Jiménez", parentEmail: "carlos@email.com", parentPhone: "7733-9900",
    children: [{ name: "Lucas", age: 3 }],
    status: "checked-in", createdAt: new Date().toISOString(),
  },
  {
    id: "r3", bookingCode: "LUM-7654",
    date: TODAY, slotId: "s2", slotTime: "11:30", slotEndTime: "13:30",
    sessionType: "open",
    parentName: "Valeria Solís", parentEmail: "vale@email.com", parentPhone: "6621-0044",
    children: [{ name: "Emilia", age: 5 }, { name: "Nicolás", age: 8 }],
    status: "confirmed", createdAt: new Date().toISOString(),
  },
  {
    id: "r4", bookingCode: "LUM-2290",
    date: TODAY, slotId: "s2", slotTime: "11:30", slotEndTime: "13:30",
    sessionType: "open",
    parentName: "Daniela Castro", parentEmail: "dani@email.com", parentPhone: "8899-1122",
    children: [{ name: "Isabella", age: 2 }],
    status: "confirmed", createdAt: new Date().toISOString(),
  },
  {
    id: "r5", bookingCode: "LUM-8801",
    date: TODAY, slotId: "p2", slotTime: "13:00", slotEndTime: "16:00",
    sessionType: "party",
    parentName: "Rebeca Vargas", parentEmail: "rebe@email.com", parentPhone: "7788-5544",
    children: [{ name: "Amelia", age: 5 }, { name: "Pablo", age: 7 }, { name: "Lola", age: 3 }],
    status: "confirmed", createdAt: new Date().toISOString(),
  },
  {
    id: "r6", bookingCode: "LUM-1155",
    date: TODAY, slotId: "s4", slotTime: "16:30", slotEndTime: "18:30",
    sessionType: "open",
    parentName: "Miguel Ángel Torres", parentEmail: "miguel@email.com", parentPhone: "6600-8877",
    children: [{ name: "Diego", age: 9 }],
    status: "confirmed", createdAt: new Date().toISOString(),
  },
];

export const MUNDOS = [
  { id: 1, name: "El Correo",      emoji: "📬", desc: "Mensajes, sellos y aventuras postales.",   color: "#F5834A", bg: "#FFF0E8" },
  { id: 2, name: "La Veterinaria", emoji: "🐾", desc: "Cuida y sana a todos los animalitos.",     color: "#8DC63F", bg: "#F0F9E0" },
  { id: 3, name: "El Spa",         emoji: "💅", desc: "Camerino y peluquería de fantasía.",       color: "#E8A0B0", bg: "#FDE8EE" },
  { id: 4, name: "El Jardín",      emoji: "🌱", desc: "Siembra, riega y descubre la naturaleza.", color: "#8DC63F", bg: "#F0F9E0" },
  { id: 5, name: "Construcción",   emoji: "🏗️", desc: "Bloques, herramientas y grandes obras.",  color: "#E05A3A", bg: "#FDEDE9" },
  { id: 6, name: "Piscina de Bolas",emoji: "🎱", desc: "Buceo en colores, saltos y risas.",       color: "#4ABFB5", bg: "#E4F6F5" },
  { id: 7, name: "Tobogán",        emoji: "🎢", desc: "¡Arriba, abajo y de nuevo arriba!",        color: "#FFCC00", bg: "#FFFADB" },
  { id: 8, name: "Área de Lectura",emoji: "📚", desc: "Cuentos, cojines y mundos por descubrir.", color: "#E8A0B0", bg: "#FDE8EE" },
  { id: 9, name: "Redes & Hamacas",emoji: "🕸️", desc: "Trepa, balancea y vuela sin límites.",    color: "#4ABFB5", bg: "#E4F6F5" },
  { id: 10, name: "Zona 0–3 años", emoji: "🍼", desc: "Suave, seguro y lleno de estímulos.",      color: "#E8A0B0", bg: "#FDE8EE" },
];

export function generateBookingCode(): string {
  return "LUM-" + Math.floor(1000 + Math.random() * 9000);
}

export function getAvailableSlots(date: string, type: SessionType, existingReservations: Reservation[]): TimeSlot[] {
  const slotsForType = TIME_SLOTS.filter((s) => s.type === type);
  return slotsForType.map((slot) => {
    const extra = existingReservations.filter(
      (r) => r.date === date && r.slotId === slot.id && r.status !== "cancelled"
    ).reduce((sum, r) => sum + r.children.length, 0);
    return { ...slot, booked: slot.booked + extra };
  });
}
