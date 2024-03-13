import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  // Keyboard animations
  const top = useTransform(scrollYProgress, [0.42, 0.70], ["0vh", "-20vh"]);
  const width = useTransform(
    scrollYProgress,
    [0.42, 0.70],
    ["16.666667%;", "100vw"],
  );

  // Text animations
  const textTop = useTransform(scrollYProgress, [0.42, 0.70], ["0vh", "40vh"]);
  const opacity = useTransform(scrollYProgress, [0.42, 0.5, .75], [1, .25, 0]);
  const scale = useTransform(scrollYProgress, [0.42, 0.5, .75], [1, .85, .5]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Scroll Y", latest);
  });

  return (
    <div
      className="relative mt-[25vh] h-[200vh] w-screen bg-[var(--bg-color)]"
      ref={ref}
    >
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
        style={{ top: textTop, opacity, scale }}
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
      <motion.div
        className="sticky top-0 m-auto mt-[15vh] flex h-1/2 w-1/6 flex-col gap-5 rounded-3xl bg-[var(--sub-text-color)] pt-12"
        style={{ top, width }}
      >
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
      </motion.div>
    </div>
  );
}
