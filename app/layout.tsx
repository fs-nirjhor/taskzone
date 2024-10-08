import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig?.title,
    template: `%s | ${siteConfig?.title}`,
  },
  description: siteConfig?.description,
  keywords: siteConfig?.keywords,
  authors: [{ name: siteConfig?.author }],
  creator: siteConfig?.creator,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: siteConfig?.title,
    description: siteConfig?.description,
    url: siteConfig?.url,
    siteName: siteConfig?.title,
    images: [
      {
        url: siteConfig?.ogImage,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    title: siteConfig?.title,
    card: "summary_large_image",
    site: siteConfig?.twitterHandle,
    creator: siteConfig?.twitterHandle,
  },
  // icons: {
  //   shortcut: "/favicon.ico",
  //   icon: "/icon.png",
  //   apple: "/apple-icon.png",
  //   other: {
  //     rel: "icon",
  //     url: "/favicon.ico",
  //   },
  // },
  // metadataBase: new URL(siteConfig?.url),
  //manifest: "/manifest.json",
  appleWebApp: {
    title: siteConfig?.title,
    capable: true,
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
