import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 rounded-full border border-current/25 px-3 py-1 font-mono text-[11px] uppercase tracking-widest", className)}
      {...props}
    />
  );
}
