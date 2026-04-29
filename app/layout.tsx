import type { Metadata } from "next";
import "./globals.css";
import { ReservationProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "LUMA Coffee & Play — Curridabat",
  description: "Play time for them, coffee time for you! Reservá tu sesión en LUMA, el espacio de juego más especial de Curridabat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col">
        <ReservationProvider>
          {children}
        </ReservationProvider>
      </body>
    </html>
  );
}
