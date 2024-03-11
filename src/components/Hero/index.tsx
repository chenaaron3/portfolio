import { AnimatePresence, motion, type Variants } from "framer-motion";
import { COVER_DELAY } from "~/utils/constants";

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
    <div className="mt-[10vh] h-[200vh] w-screen bg-[var(--bg-color)] ">
      <motion.div
        className="flex flex-col items-center gap-5"
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
          As a seasoned software engineer, I materialize ideas into outstanding
          websites. <br /> My current focus is developing malware detection
          software for Rubrik.
        </motion.div>
      </motion.div>
    </div>
  );
}
