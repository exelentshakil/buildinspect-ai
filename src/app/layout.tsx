import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuildInspect AI | Commercial Building Inspection & Compliance Platform (AS 4349.1 / NCC)",
  description: "Commercial-grade AI workflow platform for Australian building inspections. Automated computer vision defect analysis, AS 4349.1 / AS 4349.3 standards matching, rectification cost schedules in AUD, and modular plugin architecture.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏗️</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        {/* Demo Traffic Analytics Pixel */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://demo-traffic.vercel.app/api/px?p=buildinspect-ai"
          alt=""
          width={1}
          height={1}
          style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
        />
      </body>
    </html>
  );
}
