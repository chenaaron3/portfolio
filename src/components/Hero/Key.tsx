import { type Variants, motion, useAnimationControls } from "framer-motion";

interface KeyProps {
  character: string;
}

export const Key: React.FC<KeyProps> = ({ character }) => {
  const variants: Variants = {
    hover: {
      left: "0.25rem",
      top: "0.5rem",
      color: "var(--main-color)",
    },
    idle: {
      left: 0,
      top: 0,
      color: "var(--text-color)",
    },
  };

  const controls = useAnimationControls();

  return (
    <div className="relative flex justify-center">
      <div className="absolute left-1 top-2 h-10 w-10 rounded-xl bg-[var(--bg-color)]"></div>
      <motion.div
        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border bg-[var(--sub-color)] text-[var(--text-color)]"
        initial="idle"
        variants={variants}
        animate={controls}
        transition={{
          duration: 0.15,
          ease: "anticipate",
        }}
        onMouseEnter={async () => {
          await controls.start("hover");
        }}
        onMouseLeave={async () => {
            await new Promise(r => setTimeout(r, 100));
            await controls.start("idle")
          }}
        layout
      >
        <span className="z-10 text-lg font-bold">{character}</span>
      </motion.div>
    </div>
  );
};
