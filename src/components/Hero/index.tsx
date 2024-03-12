import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  type Variants,
} from "framer-motion";
import { COVER_DELAY } from "~/utils/constants";
import { Key } from "./Key";
import { useRef } from "react";

const variants: Variants = {
  hidden: {
    scale: 0.9,
    opacity: 0,
    top: 5,
  },
  visible: {
    scale: 1,
    opacity: 1,
    top: 0,
  },
};

export default function Hero() {
  return (
    <div className="relative mt-[15vh] h-[200vh] w-screen bg-[var(--bg-color)]">
      <motion.div
        className="relative flex flex-col items-center gap-5"
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{
          duration: 1,
          delayChildren: COVER_DELAY + 0.5,
          staggerChildren: 0.25,
        }}
      >
        <motion.div
          className="relative text-[var(--main-color)]"
          variants={variants}
        >
          Hi there! My name is
        </motion.div>
        <motion.div
          className="relative text-7xl text-[var(--sub-text-color)]"
          variants={variants}
        >
          Aaron Chen.
        </motion.div>
        <motion.div
          className="relative text-5xl  text-[var(--text-color)]"
          variants={variants}
        >
          I build things on computers.
        </motion.div>
        <motion.div
          className="relative mt-3 text-center text-xl text-[var(--text-color)]"
          variants={variants}
        >
          As a software engineer, I materialize ideas into outstanding websites.{" "}
          <br /> My current focus is developing malware detection software for
          Rubrik.
        </motion.div>
      </motion.div>

      {/* Keyboard */}
      <div className="m-auto mt-24 flex h-1/2 w-1/6 flex-col gap-5 rounded-3xl bg-[var(--sub-alt-color)] pt-12">
        <div className="flex justify-center gap-3">
          <Key character={"S"} />
          <Key character={"E"} />
          <Key character={"E"} />
        </div>
        <div className="flex justify-center gap-3">
          <Key character={"M"} />
          <Key character={"O"} />
          <Key character={"R"} />
          <Key character={"E"} />
        </div>
        <div className="flex justify-center gap-3 ">
          <span className="mt-3 animate-bounce hover:mt-0 hover:animate-none">
            <Key character={"↓"} />
          </span>
        </div>
      </div>
    </div>
  );
}
