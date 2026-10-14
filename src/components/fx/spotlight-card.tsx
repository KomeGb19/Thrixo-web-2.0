"use client";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Aceternity-style spotlight: a radial glow follows the pointer inside the card. */
export function SpotlightCard({ children, className, color = "rgba(214,255,63,0.22)" }: { children: React.ReactNode; className?: string; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [on, setOn] = useState(false);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ opacity: on ? 1 : 0, background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 60%)` }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
