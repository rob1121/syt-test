import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/context/query-provider";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SuperYachts | Hire me",
  description: "Robinson Legaspi - SuperYachts Sr Frontend Engineer",
  keywords: ["SuperYachts", "Robinson Legaspi", "Frontend Engineer"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <AuthProvider>
            <QueryProvider>
        <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto">
              <Header />
              {children}
            </div>
            </QueryProvider>
          </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
