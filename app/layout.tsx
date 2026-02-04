import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/MainLayout";
import AppProvider from "@/state/Providers/AppProvider";
import ToastManager from "@/components/ToastManager";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Photoverse",
  description:
    "Photoverse is your online photo gallery—upload, organize, and access your photos anytime while freeing up storage space on your device.",
  icons: {
    icon: "/photoverse.ico",
    shortcut: "/photoverse.ico",
    apple: "/photoverse.ico",
  },
  themeColor: "#1a1b2e", // Dark theme color for mobile browsers
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#1a1b2e" />
        <meta name="msapplication-navbutton-color" content="#1a1b2e" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-scroll`}
        suppressHydrationWarning={true}
      >
        <AppProvider>
          <Layout>
            {children}
            <ToastManager />
          </Layout>
          <Toaster
            position="top-center"
            containerStyle={{
              zIndex: 99999999999999,
            }}
            toastOptions={{
              success: {
                style: {
                  backgroundColor: "oklch(0.19 0.04 240)",
                  border: "1px solid oklch(0.68 0.22 180)",
                  color: "oklch(0.95 0.01 240)",
                  padding: "16px",
                  fontSize: "14px",
                  zIndex: 99999999999,
                  backdropFilter: "blur(20px)",
                },
              },
              error: {
                style: {
                  backgroundColor: "oklch(0.19 0.04 240)",
                  border: "1px solid oklch(0.65 0.25 15)",
                  color: "oklch(0.95 0.01 240)",
                  padding: "16px",
                  fontSize: "14px",
                  zIndex: 99999999999,
                  backdropFilter: "blur(20px)",
                },
              },
              style: {
                backgroundColor: "oklch(0.19 0.04 240)",
                border: "1px solid oklch(0.72 0.28 240)",
                color: "oklch(0.95 0.01 240)",
                padding: "16px",
                fontSize: "14px",
                zIndex: 99999999999,
                backdropFilter: "blur(20px)",
              },
            }}
          />
        </AppProvider>
      </body>
    </html>
  );
}
