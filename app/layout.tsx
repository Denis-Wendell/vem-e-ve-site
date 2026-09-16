import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vem e Vê | Movimento Evangelístico",
  description:
    "Um movimento evangelístico nascido no coração de servos do Reino para cumprir o IDE e anunciar Jesus.",
  icons: {
    icon: { url: "/brand/vem-e-ve.jpg", type: "image/jpeg" },
  },
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
