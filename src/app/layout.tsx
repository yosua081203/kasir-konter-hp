// File: src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KonterHP Pro - Modern POS",
  description: "Sistem Kasir Konter HP Profesional",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        <div className="flex">
          {/* Sidebar Tetap di Kiri */}
          <Sidebar />
          
          {/* Area Konten Utama */}
          <main className="flex-1 ml-64 p-10 min-h-screen bg-slate-50">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}