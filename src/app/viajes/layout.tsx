import type { Viewport } from "next";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${openSans.variable} antialiased bg-[#141414] text-[#ededed] viajes-font`}
    >
      {children}
    </div>
  );
}
