"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/** Custom cursor. Add data-cursor="Label" to any element to show a label bubble. */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 38, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 520, damping: 38, mass: 0.35 });
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const withLabel = t?.closest<HTMLElement>("[data-cursor]");
      setLabel(withLabel?.dataset.cursor ?? null);
      setHover(Boolean(t?.closest("a,button,[role=button],input,textarea,label")));
    };
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", d);
    window.addEventListener("mouseup", u);
    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", d);
      window.removeEventListener("mouseup", u);
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = label ? 96 : hover ? 56 : 16;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] grid place-items-center rounded-full bg-lime text-ink mix-blend-normal"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: size, height: size, scale: down ? 0.85 : 1, opacity: hover || label ? 0.95 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      <AnimatePresence>
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="font-mono text-[11px] font-semibold uppercase tracking-widest"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
