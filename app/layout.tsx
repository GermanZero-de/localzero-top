import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Local Zero Top Maßnahmen",
  description: "Local Zero Top Maßnahmen für Kommunen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
