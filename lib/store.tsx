"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Reservation, MOCK_RESERVATIONS } from "./data";

interface ReservationContextValue {
  reservations: Reservation[];
  addReservation: (r: Reservation) => void;
  checkIn: (id: string) => void;
  cancelReservation: (id: string) => void;
}

const ReservationContext = createContext<ReservationContextValue | null>(null);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>(MOCK_RESERVATIONS);

  const addReservation = (r: Reservation) =>
    setReservations((prev) => [...prev, r]);

  const checkIn = (id: string) =>
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "checked-in" } : r))
    );

  const cancelReservation = (id: string) =>
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "cancelled" } : r))
    );

  return (
    <ReservationContext.Provider value={{ reservations, addReservation, checkIn, cancelReservation }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservations() {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error("useReservations must be used within ReservationProvider");
  return ctx;
}
