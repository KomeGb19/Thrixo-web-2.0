"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, MessageCircle } from "lucide-react";
import { services, site } from "@/lib/data";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const budgets = [
  "< ₦500k",
  "₦500k – ₦1.5M",
  "₦1.5M – ₦5M",
  "₦5M+",
  "Not sure yet",
];

export function ContactForm() {
  const [picked, setPicked] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [copied, setCopied] = useState(false);

  const toggle = (s: string) =>
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
          company: fd.get("company"),
          services: picked,
          budget,
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-12">
      <div className="md:col-span-7">
        <AnimatePresence mode="wait">
          {status === "done" ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid min-h-[420px] place-items-center rounded-[2rem] bg-lime p-10 text-center"
            >
              <div>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="mx-auto grid size-20 place-items-center rounded-full bg-ink text-lime"
                >
                  <Check className="size-9" />
                </motion.span>
                <h2 className="mt-6 text-5xl font-semibold tracking-tight">
                  Brief received.
                </h2>
                <p className="mt-3 text-xl text-ink/70">
                  Expect a reply within 48 hours. Sooner if you ping us on
                  WhatsApp.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              className="relative space-y-12"
            >
              {/* honeypot: hidden from people, bots fill it in */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="absolute -left-[9999px] size-0 opacity-0"
              />

              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                <label className="block">
                  <span className="font-mono text-xs uppercase tracking-widest text-ink/50">
                    01 · Your name
                  </span>
                  <Input
                    required
                    name="name"
                    placeholder="Ada Okafor"
                    autoComplete="name"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-xs uppercase tracking-widest text-ink/50">
                    02 · Email
                  </span>
                  <Input
                    required
                    type="email"
                    name="email"
                    placeholder="ada@company.com"
                    autoComplete="email"
                  />
                </label>
              </div>

              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-ink/50">
                  03 · What do you need?
                </p>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => toggle(s.title)}
                      className={cn(
                        "rounded-full border px-5 py-2.5 text-lg transition-all",
                        picked.includes(s.title)
                          ? "border-ink bg-ink text-lime"
                          : "border-ink/20 hover:border-ink",
                      )}
                    >
                      {picked.includes(s.title) && (
                        <Check className="mr-1.5 inline size-4" />
                      )}
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-ink/50">
                  04 · Rough budget
                </p>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBudget(b)}
                      className={cn(
                        "rounded-full border px-5 py-2.5 text-lg transition-all",
                        budget === b
                          ? "border-brand bg-brand text-white"
                          : "border-ink/20 hover:border-ink",
                      )}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="font-mono text-xs uppercase tracking-widest text-ink/50">
                  05 · Tell us everything
                </span>
                <Textarea
                  required
                  name="message"
                  placeholder="The idea that won't leave you alone…"
                />
              </label>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  type="submit"
                  size="lg"
                  variant="brand"
                  disabled={status === "sending"}
                  data-cursor="Send"
                >
                  {status === "sending" ? "Sending…" : "Send brief"}
                </Button>
                {status === "error" && (
                  <p className="text-coral">
                    Something went wrong. Try WhatsApp instead.
                  </p>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <aside className="space-y-4 md:col-span-4 md:col-start-9">
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noreferrer"
          data-cursor="Chat"
          className="group flex items-center justify-between rounded-[2rem] bg-ink p-8 text-paper transition-colors hover:bg-brand"
        >
          <span>
            <span className="block font-mono text-xs uppercase tracking-widest text-lime">
              Fastest reply
            </span>
            <span className="mt-2 block text-3xl font-semibold tracking-tight">
              Chat on WhatsApp
            </span>
          </span>
          <MessageCircle className="size-10 transition-transform group-hover:scale-110" />
        </a>

        <div className="rounded-[2rem] bg-paper-2 p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-ink/50">
            Email
          </p>
          <p className="mt-2 break-all text-2xl font-medium">{site.email}</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(site.email);
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/25 px-4 py-2 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
          >
            {copied ? (
              <>
                <Check className="size-4" /> Copied
              </>
            ) : (
              <>
                <Copy className="size-4" /> Copy email
              </>
            )}
          </button>
        </div>

        <div className="rounded-[2rem] border border-ink/15 p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-ink/50">
            Studio
          </p>
          <p className="mt-2 text-2xl font-medium">{site.city}</p>
          <p className="mt-1 text-ink/60">Working with teams worldwide.</p>
        </div>
      </aside>
    </div>
  );
}
