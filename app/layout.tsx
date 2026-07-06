import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: site.url,
  },
  authors: [{ name: site.author }],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/og/site",
        width: 1200,
        height: 630,
        alt: site.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og/site"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="flex min-h-full flex-col">
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
