import { cn } from "@/lib/utils";

export function Marquee({ children, reverse, speed = 30, className, pauseOnHover = true }: { children: React.ReactNode; reverse?: boolean; speed?: number; className?: string; pauseOnHover?: boolean }) {
  return (
    <div className={cn("group flex overflow-hidden [--gap:2rem] gap-(--gap)", className)}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn("flex shrink-0 items-center gap-(--gap) animate-marquee", pauseOnHover && "group-hover:[animation-play-state:paused]")}
          style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
