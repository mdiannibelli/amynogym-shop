import type { Metadata } from "next";
import "./globals.css";
// Config/Font.ts
import { mainFont} from "@/config/font";

export const metadata: Metadata = {
  //title: "AMYNOGYM | Tienda Online",
  title: {
    template: '%s - AMYNOGYM',
    default: 'AMYNOGYM | Tienda Online'
  },
  description: "Tienda online de ropa deportiva Amynogym",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mainFont.className}>{children}</body>
    </html>
  );
}