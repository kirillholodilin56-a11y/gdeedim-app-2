import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ГдеЕдим",
  description: "Живое меню до визита",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ГдеЕдим",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FAF8F5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} font-sans`}>
        <div className="mx-auto min-h-screen w-full max-w-[430px] bg-cream shadow-2xl shadow-charcoal/5">
          {children}
        </div>
      </body>
    </html>
  );
}
