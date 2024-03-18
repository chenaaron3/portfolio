import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";
import { Line } from "./Line";
import { Power } from "../Hero/Power";

export const AboutKeyframes = {
  init: 0,
  line1: 0.2,
  line2: 0.4,
  line3: 0.6,
  line4: 0.8,
  finish: 1,
};

export default function About() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const [scrollState, setScrollState] = useState(0);
  const power = useMotionValue(0.85);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollState(latest);
  });

  return (
    <div className="relative flex h-[500vh] w-screen justify-center" ref={ref}>
      <AnimatePresence>
        {scrollState > 0 && (
          <motion.div
            className="fixed top-[calc(50vh_-_30vh)] h-[60vh] w-[50vw] rounded-xl bg-[var(--sub-alt-color)]"
            initial={{ translateY: "10px", opacity: .75 }}
            animate={{ translateY: 0, opacity: 1 }}
          >
            <div className="absolute flex h-14 w-full items-center rounded-t-xl bg-[var(--sub-color)] text-2xl">
              <div className="absolute ml-3 flex gap-3">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <span className="m-auto font-semibold text-[var(--text-color)]">
                About Me
              </span>
              <motion.div className="absolute right-5 h-[2vh] w-[2vh]">
                <Power scrollState={power} />
              </motion.div>
            </div>
            <div className="mt-14 flex flex-col gap-3 p-7 text-3xl text-[var(--text-color)]">
              <Line
                text="Hello World! My name is Aaron Chen and I am a Full Stack Software
            Engineer working at Rubrik."
                scrollState={scrollState}
                start={AboutKeyframes.init}
                end={AboutKeyframes.line1}
              />
              <Line
                text="As a computer scientist, my mantra is to seek growth through continuous 
                    learning."
                scrollState={scrollState}
                start={AboutKeyframes.line1}
                end={AboutKeyframes.line2}
              />
              <Line
                text="Whether it be researching the hottest trends for frontend designs
                    or picking up a new programming language for work, I am always on the lookout
                    to improve my skills."
                scrollState={scrollState}
                start={AboutKeyframes.line2}
                end={AboutKeyframes.line3}
              />
              <Line
                text="To achieve this goal, I follow the principles of 'Learn By
                    Doing'. This portfolio showcases some of my findings."
                scrollState={scrollState}
                start={AboutKeyframes.line3}
                end={AboutKeyframes.finish}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
