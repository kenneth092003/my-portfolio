import type { Metadata } from "next";
import SplashScreen from "@/components/SplashScreen";
import ShaderBackdrop from "@/components/ShaderBackdrop";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kenneth Pasaje | Next.js Portfolio",
  description:
    "A bold one-page portfolio for Kenneth Pasaje, a full-stack developer building clean, modern web experiences.",
  openGraph: {
    title: "Kenneth Pasaje | Next.js Portfolio",
    description:
      "A bold one-page portfolio for Kenneth Pasaje, a full-stack developer building clean, modern web experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-black text-slate-900 font-sans">
        <ShaderBackdrop />
        <SplashScreen />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
