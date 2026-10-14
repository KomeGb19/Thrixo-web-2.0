import * as React from "react";
import { cn } from "@/lib/utils";

const field = "w-full border-0 border-b-2 border-ink/20 bg-transparent py-4 text-xl outline-none transition-colors placeholder:text-ink/35 focus:border-brand";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn(field, className)} {...props} />
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => <textarea ref={ref} className={cn(field, "min-h-32 resize-none", className)} {...props} />
);
Textarea.displayName = "Textarea";
