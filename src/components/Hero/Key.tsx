import { type Variants, motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

interface KeyProps {
  character: string;
  forcePress?: boolean;
  bouncy?: boolean;
}

export const Key: React.FC<KeyProps> = ({ character, forcePress, bouncy }) => {
  const variants: Variants = {
    hover: {
      opacity: 1,
      left: "0.25rem",
      top: "0.5rem",
      color: "var(--main-color)",
      filter: "drop-shadow(0px 0px 3px var(--main-color))",
      scale: 1,
    },
    idle: {
      opacity: 1,
      left: 0,
      top: 0,
      color: "var(--text-color)",
      filter: "drop-shadow(0px 0px 0px var(--main-color))",
      scale: 1,
    },
    hide: {
      opacity: .25,
      scale: .75,
    }
  };

  const controls = useAnimationControls();

  useEffect(() => {
    if (forcePress) {
      void controls.start("hover");
    } else {
      void controls.start("idle");
    }
  }, [controls, forcePress]);

  return (
    <div
      className={`relative flex justify-center
      ${bouncy ? "animate-bounce hover:animate-none" : ""}
      ${forcePress ? "animate-none" : ""}`}
    >
      <div className="absolute left-1 top-2 border h-10 w-10 rounded-xl bg-[var(--bg-color)]"></div>
      <motion.div
        className="relative z-10 flex h-10 w-10 items-center justify-center border rounded-xl bg-[var(--sub-color)] text-[var(--text-color)]"
        initial="hide"
        variants={variants}
        animate={controls}
        transition={{
          duration: 0.15,
          ease: "anticipate",
        }}
        onMouseEnter={async () => {
          if (!forcePress) {
            await controls.start("hover");
          }
        }}
        onMouseLeave={async () => {
          if (!forcePress) {
            await new Promise((r) => setTimeout(r, 100));
            await controls.start("idle");
          }
        }}
        exit={"hide"}
        layout
      >
        <span className="z-10 text-base lg:text-lg font-bold">{character}</span>
      </motion.div>
    </div>
  );
};
