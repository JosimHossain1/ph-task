import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashbord/app-sidebar";
import { SiteHeader } from "@/components/dashbord/side-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BookWorm Dashboard | Smart Reading Tracker",
    template: "%s | BookWorm",
  },
  description:
    "BookWorm is a personalized book recommendation and reading tracker dashboard. Track your reading progress, manage your library, and discover books tailored to your taste.",
  applicationName: "BookWorm",
  keywords: [
    "Book tracker",
    "Reading dashboard",
    "Book recommendation app"
  ],
  authors: [{ name: "BookWorm Team" }],
  creator: "BookWorm",

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >

            <SidebarProvider
              style={
                {
                  "--sidebar-width": "calc(var(--spacing) * 72)",
                  "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
              }
            >
              <AppSidebar variant="inset" />
              <SidebarInset>
                <SiteHeader />
               {children}
              </SidebarInset>
            </SidebarProvider>
       
      </body>
    </html>
  );
}
