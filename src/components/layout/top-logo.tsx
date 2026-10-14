"use client";
import Link from "next/link";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

/** Fixed top-left logo. At the top of the page it shows the full wordmark;
 *  once you scroll it collapses to the "t" badge inside a frosted pill. */
export function TopLogo() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 60));

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] px-4 md:px-8"
      style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 12px)" }}
    >
      <Link
        href="/"
        aria-label="Thrixo home"
        data-cursor="Home"
        className={cn(
          "pointer-events-auto inline-flex items-center rounded-full p-1 transition-all duration-300",
          scrolled &&
            "bg-(--color-paper)/80 shadow-[0_6px_30px_rgba(0,0,0,0.12)] ring-1 ring-(--color-ink)/10 backdrop-blur-xl",
        )}
      >
        <Image src="/logo.png" alt="Thrixo Logo" width={100} height={100} className="h-10 w-10" />
        <span
          className={cn(
            "overflow-hidden whitespace-nowrap text-2xl font-semibold tracking-tight transition-all duration-300",
            scrolled
              ? "max-w-0 pl-0 opacity-0"
              : "max-w-[8rem] pl-2 pr-3 opacity-100",
          )}
        >
          Thrixo
        </span>
      </Link>
    </div>
  );
}
