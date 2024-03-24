import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { Line } from "./Line";
import { Power } from "../Hero/Power";
import { Avatar } from "./Avatar";

export const AboutKeyframes = {
  init: 0,
  lineStart: 0.1,
  lineFinish: 0.75,
  lineFadeOut: 0.8,
  pictureFadeIn: 0.82,
  pictureFadeInEnd: .85,
  pictureFadeOut: 0.95,
  pictureFadeOutEnd: 0.97,
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
    console.log(latest)
    setScrollState(latest);
  });

  return (
    <div className="relative flex h-[700vh] w-screen justify-center" ref={ref}>
      <AnimatePresence>
        {scrollState > 0 && (
          <motion.div
            className="sticky top-[calc(50vh_-_30vh)] flex h-[60vh] w-[50vw] flex-col rounded-xl bg-[var(--sub-alt-color)]"
            initial={{ translateY: "10px", opacity: 0.75 }}
            animate={{ translateY: 0, opacity: 1 }}
          >
            <div className="relative flex h-14 w-full items-center rounded-t-xl bg-[var(--sub-color)] text-2xl">
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
            <div className="flex flex-1 flex-col gap-3 p-7 text-3xl text-[var(--text-color)]">
              {scrollState < AboutKeyframes.pictureFadeIn && (
                <>
                  <Line
                    text="Hello World! My name is Aaron Chen and I am a Full Stack Software
            Engineer working at Rubrik."
                    scrollState={scrollState}
                    scrollYProgress={scrollYProgress}
                    index={0}
                  />
                  <Line
                    text="As a computer scientist, my mantra is to seek growth through continuous 
                    learning."
                    scrollState={scrollState}
                    scrollYProgress={scrollYProgress}
                    index={1}
                  />
                  <Line
                    text="Whether it be experimenting with modern frontend designs
                    or picking up a new programming language for work, I am always on the lookout
                    to improve my skills."
                    scrollState={scrollState}
                    scrollYProgress={scrollYProgress}
                    index={2}
                  />
                  <Line
                    text="To achieve this goal, I follow the principles of 'Learn By
                    Doing'. This portfolio showcases some of my findings."
                    scrollState={scrollState}
                    scrollYProgress={scrollYProgress}
                    index={3}
                  />
                </>
              )}
              {scrollState >= AboutKeyframes.pictureFadeIn && (
                <>
                  <Avatar scrollYProgress={scrollYProgress} />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
