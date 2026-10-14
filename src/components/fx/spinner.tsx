"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const Spinner = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const rot = useTransform(scrollYProgress, [0, 1], [0, 40]);
  return (
    <motion.div
      style={{ rotate: rot }}
      className="fixed z-20 right-10 top-[65%] hidden size-45 place-items-center rounded-full bg-brand text-white md:grid"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
        <defs>
          <path id="c" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-white font-mono text-[9px] uppercase tracking-[0.25em]">
          <textPath href="#c">•design •build •automate •live</textPath>
        </text>
      </svg>
      <Image
        src="/logo.png"
        alt="Thrixo Logo"
        width={100}
        height={100}
        className="h-20 w-20 bg-black rounded-full"
      />
    </motion.div>
  );
};

export default Spinner;
