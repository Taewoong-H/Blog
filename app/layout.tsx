import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "taewoong.log",
    template: "%s | taewoong.log",
  },
  description: "개발, 여행, 투자, 운동을 기록하는 개인 블로그입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="flex min-h-full flex-col bg-stone-50 text-stone-950 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
