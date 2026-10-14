"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Reveal({ children, delay = 0, y = 40, className }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word masked headline reveal. Wrap words in *asterisks* for serif-italic accent. */
export function SplitText({ text, className, delay = 0, as: Tag = "h2" }: { text: string; className?: string; delay?: number; as?: "h1" | "h2" | "h3" | "p" }) {
  const tokens = text.split(" ");
  return (
    <Tag className={cn("flex flex-wrap gap-x-[0.28em]", className)}>
      {tokens.map((raw, i) => {
        const accent = raw.startsWith("*") && raw.endsWith("*");
        const word = accent ? raw.slice(1, -1) : raw;
        return (
          <span key={i} className="overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <motion.span
              className={cn("inline-block", accent && "font-serif font-normal italic")}
              initial={{ y: "110%", rotate: 4 }}
              whileInView={{ y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
