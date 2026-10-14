"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, LayoutGrid, Mail, Sparkles, Users } from "lucide-react";
import { site } from "@/lib/data";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const items = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Work", href: "/work", Icon: LayoutGrid },
  { label: "Services", href: "/services", Icon: Sparkles },
  { label: "About", href: "/about", Icon: Users },
  { label: "Contact", href: "/contact", Icon: Mail },
];

export function BottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex justify-center px-3"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 20px)" }}
    >
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.3, type: "spring", stiffness: 160, damping: 20 }}
        className="pointer-events-auto relative flex max-w-full items-center gap-0.5 overflow-hidden rounded-full border border-white/20 bg-[#0d0d0d]/60 p-1.5 text-white shadow-[0_12px_40px_-8px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/15 dark:bg-[#17171a]/55 md:gap-1"
      >
        {/* soft top sheen */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/20 to-transparent" />

        {items.map(({ label, href, Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              data-cursor={label}
              className="relative flex h-11 items-center gap-2 rounded-full px-3 text-sm font-medium md:px-5 md:text-[15px]"
            >
              {active && (
                <motion.span
                  layoutId="bottom-nav-pill"
                  className="absolute inset-0 rounded-full bg-brand"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <Icon
                className={cn(
                  "relative size-[18px] shrink-0",
                  active ? "text-[#0d0d0d]" : "opacity-80",
                )}
              />
              <span
                className={cn(
                  "relative",
                  active
                    ? "inline text-[#0d0d0d]"
                    : "hidden opacity-80 md:inline",
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}

        <span className="relative mx-1 h-6 w-px bg-white/25" />
        <ThemeToggle className="relative" />

        <a
          href={site.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="relative ml-1 hidden h-11 items-center gap-1.5 rounded-full border border-white/25 bg-lime/80 px-5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white hover:text-[#0d0d0d] lg:inline-flex"
        >
          Say hello <span className="text-brand">+</span>
        </a>
      </motion.div>
    </nav>
  );
}
