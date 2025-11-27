import type { Viewport } from "next";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${nunito.variable} antialiased comidas-font`}>
      {children}
    </div>
  );
}
