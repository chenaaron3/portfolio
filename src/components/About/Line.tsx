import {
  AnimatePresence,
  type Variants,
  motion,
  useAnimationControls,
  type MotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import { calcOffset } from "~/utils/animation";
import { AboutKeyframes } from ".";

interface LineProps {
  scrollYProgress: MotionValue<number>;
  scrollState: number;
  text: string;
  index: number;
}
const lineVariants: Variants = {
  hidden: {
    opacity: 0,
    top: 10,
  },
  visible: {
    opacity: 1,
    top: 0,
  },
};
export const Line: React.FC<LineProps> = ({
  scrollState,
  text,
  scrollYProgress,
  index,
}) => {
  const [words, setWords] = useState<string[]>([]);

  const fadeInOffset = calcOffset(
    AboutKeyframes.lineStart,
    AboutKeyframes.lineFinish,
    4,
    index,
  )
  const start = fadeInOffset.offset
  const end = fadeInOffset.nextOffset

  const fadeOutOffset = calcOffset(
    AboutKeyframes.lineFadeOut,
    AboutKeyframes.pictureFadeIn,
    4,
    index,
  )

  const translate = useTransform(
    scrollYProgress,
    [fadeOutOffset.offset, fadeOutOffset.nextOffset],
    [0, 10],
  );
  const opacity = useTransform(
    scrollYProgress,
    [fadeOutOffset.offset, fadeOutOffset.nextOffset],
    [1, 0],
  )

  useEffect(() => {
    setWords(text.split(" "));
  }, [text]);

  return (
    <AnimatePresence>
      {scrollState >= start && (
        <motion.p
          className="mb-3"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          style={{
            translateX: translate, translateY: translate, opacity
          }}
        >
          <span className="mr-3 text-[var(--main-color)]">&gt;</span>
          {words.map((word, i) => {
            const offset = calcOffset(start, end, words.length, i);
            return (
              <Word
                key={`${word}-${i}`}
                text={word}
                active={scrollState > offset.offset}
              />
            );
          })}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

interface WordProps {
  text: string;
  active?: boolean;
}
const wordVariants: Variants = {
  hidden: {
    opacity: 0.25,
  },
  highlight: {
    color: "var(--main-color)",
    opacity: 0.5,
  },
  visible: {
    color: "var(--text-color)",
    opacity: 1,
  },
};
const Word: React.FC<WordProps> = ({ text, active }) => {
  const controls = useAnimationControls();
  useEffect(() => {
    const animate = async () => {
      if (active) {
        // When active, highlight for a brief moment
        await controls.start("highlight", {
          duration: 0.1,
        });
        await new Promise((r) => setTimeout(r, 100));
        await controls.start("visible");
      } else {
        await controls.start("hidden");
      }
    };
    void animate();
  }, [active, controls]);

  return (
    <motion.span variants={wordVariants} initial="hidden" animate={controls}>
      {text + " "}
    </motion.span>
  );
};
