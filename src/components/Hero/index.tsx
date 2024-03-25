import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { COVER_DELAY } from "~/utils/constants";
import { useEffect, useRef, useState } from "react";
import { Keys } from "./Keys";
import { Power } from "./Power";

const textVariants: Variants = {
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

const keyboardVariants: Variants = {
  hidden: {
    opacity: 0,
    top: "75%",
  },
  visible: {
    opacity: 1,
    top: "50%",
  },
};

export const HeroKeyframes = {
  init: 0,
  seeMoreFadeIn: 0.1,
  seeMorePressed: 0.4,
  seeMoreFadeOut: 0.45,
  powerFadeIn: 0.5,
  powerFinish: 0.9,
  powerFadeOut: 0.95,
  finish: 1,
};

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [scrollState, setScrollState] = useState(0);

  // Keyboard animations
  const translate = useTransform(
    scrollYProgress,
    [HeroKeyframes.init, HeroKeyframes.seeMoreFadeIn],
    ["0", "-50%"],
  );
  const powerScale = useTransform(
    scrollYProgress,
    [
      HeroKeyframes.powerFadeIn,
      HeroKeyframes.powerFinish,
      HeroKeyframes.powerFadeOut,
      HeroKeyframes.finish,
    ],
    [1, 1.1, 1.1, 0.5],
  );
  const powerOpacity = useTransform(
    scrollYProgress,
    [HeroKeyframes.powerFadeOut, 0.99, HeroKeyframes.finish],
    [1, 0.5, 0],
  );

  // Text animations
  const textTop = useTransform(
    scrollYProgress,
    [HeroKeyframes.init, HeroKeyframes.seeMoreFadeIn],
    ["0vh", "40vh"],
  );
  const opacity = useTransform(
    scrollYProgress,
    [HeroKeyframes.init, HeroKeyframes.seeMoreFadeIn],
    [1, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [HeroKeyframes.init, HeroKeyframes.seeMoreFadeIn],
    [1, 0.5],
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollState(latest);
  });

  // Update background gradient position
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = ev;
      ref.current.style.setProperty("--x", `${clientX}px`);
      ref.current.style.setProperty("--y", `${clientY}px`);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div
      id="Home"
      className="relative h-[500vh] w-screen
      before:fixed before:inset-0 before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_100px)_var(--y,_100px),_var(--main-color)_-100%,_transparent_100%)] before:opacity-20
      "
      ref={ref}
    >
      <motion.div
        className="relative mb-24 flex flex-col items-center gap-5 pt-[25vh]"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        transition={{
          duration: 1,
          delayChildren: COVER_DELAY + 0.5,
          staggerChildren: 0.25,
        }}
        style={{ top: textTop, opacity, scale }}
      >
        <motion.div
          className="relative text-[var(--main-color)]"
          variants={textVariants}
        >
          Hi there! My name is
        </motion.div>
        <motion.div
          className="relative text-7xl text-[var(--sub-text-color)]"
          variants={textVariants}
        >
          Aaron Chen.
        </motion.div>
        <motion.div
          className="relative text-5xl  text-[var(--text-color)]"
          variants={textVariants}
        >
          I build things on computers.
        </motion.div>
        <motion.div
          className="relative mt-3 text-center text-xl text-[var(--text-color)]"
          variants={textVariants}
        >
          As a software engineer, I materialize ideas into outstanding websites.{" "}
          <br /> My current focus is developing malware detection software for
          Rubrik.
        </motion.div>
      </motion.div>

      {/* Keyboard */}
      <motion.div
        className="sticky top-1/2 m-auto mb-[calc(30vh_-_15vh)] flex h-[30vh] w-1/6 flex-col items-center justify-center gap-5 rounded-3xl bg-[var(--sub-alt-color)]"
        style={{
          translateY: translate,
          scale: powerScale,
          opacity: powerOpacity,
        }}
        initial="hidden"
        animate="visible"
        variants={keyboardVariants}
        transition={{
          duration: 1,
          delay: COVER_DELAY - 0.5,
        }}
      >
        <AnimatePresence>
          {scrollState <= HeroKeyframes.seeMoreFadeOut && (
            <Keys scrollState={scrollState} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {scrollState > HeroKeyframes.seeMoreFadeOut && (
            <Power scrollState={scrollYProgress} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
