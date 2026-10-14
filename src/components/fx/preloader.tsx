"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = ["Design", "Build", "Automate", "Launch"];

export function Preloader() {
  const [show, setShow] = useState(true);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("thrixo-intro")) {
      setShow(false);
      return;
    }
    const id = setInterval(() => {
      setN((v) => {
        if (v >= 100) {
          clearInterval(id);
          return 100;
        }
        return v + 2 + Math.floor(Math.random() * 4);
      });
    }, 40);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (n >= 100) {
      const t = setTimeout(() => {
        sessionStorage.setItem("thrixo-intro", "1");
        setShow(false);
      }, 350);
      return () => clearTimeout(t);
    }
  }, [n]);

  const value = Math.min(n, 100);
  const word = words[Math.min(words.length - 1, Math.floor(value / 26))];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col justify-between bg-ink p-6 text-paper md:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex justify-between font-mono text-xs uppercase tracking-widest text-paper/60">
            <span>Thrixo Agency</span>
            <span>Lagos / Worldwide</span>
          </div>
          <div className="flex items-end justify-between">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={word}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.3 }}
                  className="font-serif text-6xl italic text-lime md:text-8xl"
                >
                  {word}.
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="font-display text-[22vw] font-semibold leading-[0.8] tabular-nums md:text-[16vw]">{value}</p>
          </div>
          <div className="absolute bottom-0 left-0 h-1.5 bg-brand" style={{ width: `${value}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
