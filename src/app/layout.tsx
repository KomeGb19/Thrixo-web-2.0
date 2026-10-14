import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Cursor } from "@/components/fx/cursor";
import { Preloader } from "@/components/fx/preloader";
import { SmoothScroll } from "@/components/fx/smooth-scroll";
import { ScrollProgress } from "@/components/fx/scroll-progress";
import Spinner from "@/components/fx/spinner";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thrixoagency.com.ng"),
  title: { default: "Thrixo Agency: Building tools of the future", template: "%s · Thrixo Agency" },
  description:
    "Thrixo is a Lagos creative agency: web design, graphics, project management, video and AI content, powered by tech infrastructure that evolves with your business.",
  openGraph: { title: "Thrixo Agency", description: "We make websites, brands, films and AI content that run.", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <Preloader />
        <SmoothScroll />
        <ScrollProgress />
        <Spinner />
        <Cursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
