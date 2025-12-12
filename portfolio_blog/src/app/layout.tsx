import type { Metadata } from "next";
import { Source_Sans_3, JetBrains_Mono, DM_Serif_Display } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageContainer } from "@/components/page-container";
import "./globals.css";

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

const serif = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio & Blog",
  description: "A custom portfolio and blog experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${serif.variable} ${mono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1 py-12">
            <PageContainer>{children}</PageContainer>
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
