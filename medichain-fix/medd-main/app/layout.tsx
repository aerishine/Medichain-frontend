import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DevRoleSwitcher } from "@/components/DevRoleSwitcher";

// Khusus library pihak ketiga seperti sonner, biasanya menggunakan named export {}, jadi ini biarkan saja kecuali error
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MediChain - Immutable Pharmaceutical Supply Chain",
  description: "Track the origin of your medicine from factory to patient using blockchain technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} min-h-screen flex flex-col font-sans antialiased text-slate-900 bg-slate-50`}>
        {/* Pastikan Providers menerima children jika itu adalah wrapper client component */}
        <Providers>
          <Navbar />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
          <DevRoleSwitcher />
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}