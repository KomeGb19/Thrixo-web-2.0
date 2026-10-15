// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Cursor } from "@/components/fx/cursor";
import { Preloader } from "@/components/fx/preloader";
import { SmoothScroll } from "@/components/fx/smooth-scroll";
import { ScrollProgress } from "@/components/fx/scroll-progress";
import Spinner from "@/components/fx/spinner";
import { BottomNav } from "@/components/layout/bottom-nav";
import { TopLogo } from "@/components/layout/top-logo";
import { site } from "@/lib/data";

const SITE_URL = "https://www.thrixoagency.com.ng";
const NAME = "Thrixo Agency";
const TITLE = "Thrixo Agency: Building tools of the future";
const DESCRIPTION =
  "Thrixo is a Lagos creative agency: web design, graphics, project management, video and AI content, powered by tech infrastructure that evolves with your business.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s · ${NAME}` },
  description: DESCRIPTION,
  applicationName: NAME,
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  keywords: [
    "Thrixo",
    "creative agency Lagos",
    "web design Nigeria",
    "website development Lagos",
    "brand design",
    "video production",
    "AI content",
    "project management",
  ],
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  publisher: NAME,
  openGraph: {
    type: "website",
    siteName: NAME,
    title: NAME,
    description: "We make websites, brands, films and AI content that run.",
    locale: "en_NG",
    // The image comes from app/opengraph-image.tsx automatically.
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Favicons come from the file convention: put icon.png / apple-icon.png in /app.
  // Canonical URLs: set `alternates: { canonical: "/contact" }` in each page's own metadata.
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a", // match your --ink colour
};

// Structured data: tells Google your logo, name and contact details.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`, // put a square logo (512x512+) at public/logo.png
        width: 512,
        height: 512,
      },
      email: site.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressCountry: "NG",
      },
      description: DESCRIPTION,
      // sameAs: ["https://instagram.com/...", "https://x.com/...", "https://linkedin.com/company/..."],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Preloader />
        <SmoothScroll />
        <ScrollProgress />
        <Spinner />
        <Cursor />
        <TopLogo />
        {/* <Navbar /> */}
        <BottomNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
