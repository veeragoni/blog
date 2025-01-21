import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/config/site";
import { GoogleAnalytics } from '@next/third-parties/google'
import CookieConsentBanner from '@/components/cookie-conset'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: `${siteConfig.name} RSS Feed` },
      ],
      "application/feed+json": [
        { url: "/feed.json", title: `${siteConfig.name} JSON Feed` },
      ],
      "application/atom+xml": [
        { url: "/atom.xml", title: `${siteConfig.name} Atom Feed` },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${siteConfig.name} RSS Feed`}
          href="/feed.xml"
        />
        <link
          rel="alternate"
          type="application/feed+json"
          title={`${siteConfig.name} JSON Feed`}
          href="/feed.json"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title={`${siteConfig.name} Atom Feed`}
          href="/atom.xml"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative min-h-screen flex flex-col">
            {children}
            <CookieConsentBanner />
            <GoogleAnalytics gaId="G-9YHS24HY6J" />
            <SiteFooter />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
