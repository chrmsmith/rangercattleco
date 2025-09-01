// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rangercattleco.com"),
  title: {
    default: "Ranger Cattle Co",
    template: "%s · Ranger Cattle Co",
  },
  description:
    "Premium beef and ranch goods from Ranger Cattle Co — direct to our community.",
  openGraph: {
    title: "Ranger Cattle Co",
    description:
      "Premium beef and ranch goods from Ranger Cattle Co — direct to our community.",
    url: "https://www.rangercattleco.com",
    siteName: "Ranger Cattle Co",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ranger Cattle Co",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ranger Cattle Co",
    description:
      "Premium beef and ranch goods from Ranger Cattle Co — direct to our community.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-bg text-fg" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="border-b border-border bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-block h-9 w-9 rounded-full bg-brand" />
          <span className="text-lg font-semibold">Ranger Cattle Co</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link className="hover:opacity-80" href="/about">About</Link>
          <Link className="hover:opacity-80" href="/products">Products</Link>
          <Link className="hover:opacity-80" href="/products#newsletter">Newsletter</Link>
          <Link className="hover:opacity-80" href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 grid gap-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-block h-7 w-7 rounded-full bg-brand" />
            <span className="font-semibold">Ranger Cattle Co</span>
          </div>
          <p className="mt-3 text-sm text-muted">
            Premium food + experience. We want to feed your family.
          </p>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-2">Explore</div>
          <ul className="space-y-1">
            <li><Link className="hover:opacity-80" href="/about">About</Link></li>
            <li><Link className="hover:opacity-80" href="/products">Products</Link></li>
            <li><Link className="hover:opacity-80" href="/products#newsletter">Newsletter</Link></li>
            <li><Link className="hover:opacity-80" href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-2">Contact</div>
          <p>hello@rangercattleco.com</p>
          <p>Blue Mounds, Wisconsin</p>
        </div>
      </div>
      <div className="border-t border-border text-center text-xs text-muted py-4">
        © {new Date().getFullYear()} Ranger Cattle Co. All rights reserved.
      </div>
    </footer>
  );
}



