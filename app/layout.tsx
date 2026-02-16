import type { Metadata, Viewport } from "next";
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
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/photoverse.ico", sizes: "any" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewPort: Viewport = {
  themeColor: "#1a1b2e",
  width: "device-width",
  initialScale: 1,
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
              zIndex: 9999,
            }}
            toastOptions={{
              duration: 3000,
              success: {
                style: {
                  background: "oklch(0.19 0.04 240)",
                  border: "1px solid oklch(0.68 0.22 180)",
                  color: "oklch(0.95 0.01 240)",
                  padding: "16px",
                  fontSize: "14px",
                  backdropFilter: "blur(20px)",
                },
                iconTheme: {
                  primary: "oklch(0.68 0.22 180)",
                  secondary: "oklch(0.19 0.04 240)",
                },
              },
              error: {
                style: {
                  background: "oklch(0.19 0.04 240)",
                  border: "1px solid oklch(0.65 0.25 15)",
                  color: "oklch(0.95 0.01 240)",
                  padding: "16px",
                  fontSize: "14px",
                  backdropFilter: "blur(20px)",
                },
                iconTheme: {
                  primary: "oklch(0.65 0.25 15)",
                  secondary: "oklch(0.19 0.04 240)",
                },
              },
              style: {
                background: "oklch(0.19 0.04 240)",
                border: "1px solid oklch(0.72 0.28 240)",
                color: "oklch(0.95 0.01 240)",
                padding: "16px",
                fontSize: "14px",
                backdropFilter: "blur(20px)",
              },
            }}
          />
        </AppProvider>
      </body>
    </html>
  );
}
