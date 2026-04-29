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
  { id: "s1", time: "09:00", endTime: "11:00", label: "9:00 – 11:00 am",       type: "open",  capacity: 25, booked: 18 },
  { id: "s2", time: "11:30", endTime: "13:30", label: "11:30 am – 1:30 pm",    type: "open",  capacity: 25, booked: 7  },
  { id: "s3", time: "14:00", endTime: "16:00", label: "2:00 – 4:00 pm",        type: "open",  capacity: 25, booked: 25 },
  { id: "s4", time: "16:30", endTime: "18:30", label: "4:30 – 6:30 pm",        type: "open",  capacity: 25, booked: 3  },
  { id: "p1", time: "09:00", endTime: "12:00", label: "9:00 am – 12:00 pm",    type: "party", capacity: 25, booked: 25 },
  { id: "p2", time: "13:00", endTime: "16:00", label: "1:00 – 4:00 pm",        type: "party", capacity: 25, booked: 0  },
  { id: "p3", time: "16:30", endTime: "19:30", label: "4:30 – 7:30 pm",        type: "party", capacity: 25, booked: 0  },
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
    parentName: "Miguel Torres", parentEmail: "miguel@email.com", parentPhone: "6600-8877",
    children: [{ name: "Diego", age: 9 }],
    status: "confirmed", createdAt: new Date().toISOString(),
  },
];

/* Each world uses a brand asset from the identity kit — no emojis */
export const MUNDOS = [
  { id: 1,  name: "El Correo",        img: "/brand/expresionLumaNaranja.png", color: "#EAB05A", bg: "#FDF5E6", desc: "Mensajes, sellos y aventuras postales."       },
  { id: 2,  name: "La Veterinaria",   img: "/brand/figurativoLuma1.png",      color: "#80C4B0", bg: "#EAF7F4", desc: "Cuida y sana a todos los animalitos."          },
  { id: 3,  name: "El Spa",           img: "/brand/expresionLumaRosa.png",    color: "#DFA8C0", bg: "#FDEEF5", desc: "Camerino y peluquería de fantasía."            },
  { id: 4,  name: "El Jardín",        img: "/brand/figurativoLuma4.png",      color: "#B8CC6E", bg: "#F4F9E4", desc: "Siembra, riega y descubre la naturaleza."      },
  { id: 5,  name: "Construcción",     img: "/brand/figurativoLuma7.png",      color: "#EDCC3D", bg: "#FDFAE5", desc: "Bloques, herramientas y grandes obras."        },
  { id: 6,  name: "Piscina de Bolas", img: "/brand/expresionLumaAmarilla.png",color: "#EDCC3D", bg: "#FDFAE5", desc: "Buceo en colores, saltos y risas."             },
  { id: 7,  name: "Tobogán",          img: "/brand/figurativoLuma3.png",      color: "#D06A44", bg: "#FBEEE8", desc: "Arriba, abajo y de nuevo arriba."              },
  { id: 8,  name: "Área de Lectura",  img: "/brand/expresionLumaCyan.png",    color: "#80C4B0", bg: "#EAF7F4", desc: "Cuentos, cojines y mundos por descubrir."     },
  { id: 9,  name: "Redes & Hamacas",  img: "/brand/figurativoLuma10.png",     color: "#80C4B0", bg: "#EAF7F4", desc: "Trepa, balancea y vuela sin límites."          },
  { id: 10, name: "Zona 0–3 años",    img: "/brand/expresionLumaVerde.png",   color: "#B8CC6E", bg: "#F4F9E4", desc: "Suave, seguro y lleno de estímulos."           },
];

export function generateBookingCode(): string {
  return "LUM-" + Math.floor(1000 + Math.random() * 9000);
}

export function getAvailableSlots(
  date: string, type: SessionType, existingReservations: Reservation[]
): TimeSlot[] {
  return TIME_SLOTS
    .filter((s) => s.type === type)
    .map((slot) => {
      const extra = existingReservations
        .filter((r) => r.date === date && r.slotId === slot.id && r.status !== "cancelled")
        .reduce((sum, r) => sum + r.children.length, 0);
      return { ...slot, booked: slot.booked + extra };
    });
}
