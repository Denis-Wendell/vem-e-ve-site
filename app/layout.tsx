import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vem e Vê | Movimento Evangelístico",
  description:
    "Um movimento evangelístico nascido no coração de servos do Reino para cumprir o IDE e anunciar Jesus.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
