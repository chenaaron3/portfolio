import {
  motion,
  useTransform,
  type MotionValue,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";
import { calcOffset } from "~/utils/animation";
import { type ExperienceDetails } from ".";
import { formatDate } from "~/utils/date";
import { useMediaQuery } from "react-responsive";

// 10 vh branch height
const h = 10;
const multiplyer = (Math.SQRT2 - 1) / Math.SQRT2;

interface StraightBarProps {
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
}

export const StraightBar: React.FC<StraightBarProps> = ({
  start,
  end,
  scrollYProgress,
}) => {
  const height = useTransform(scrollYProgress, [start, end], ["0%", "100%"]);
  const filter = useTransform(
    scrollYProgress,
    [start, end],
    ["drop-shadow(0px 0px 0px #0A192F)", "drop-shadow(0px 0px 20px #40E0D0)"],
  );

  return (
    <div className={`relative w-1 h-[${3 * h}vh]`}>
      <motion.div
        className={`absolute -z-30  h-full w-full rounded bg-[var(--sub-alt-color)]`}
      />
      <motion.div
        style={{ height, filter }}
        className={`absolute -z-20  w-full rounded bg-[var(--main-color)]`}
      />
    </div>
  );
};

interface SlantBarProps {
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
  reverse?: boolean;
  experience: ExperienceDetails;
}

export const SlantBar: React.FC<SlantBarProps> = ({
  start,
  end,
  scrollYProgress,
  reverse,
  experience,
}) => {
  const [scrollState, setScrollState] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollState(latest);
  });

  const height = useTransform(
    scrollYProgress,
    [start, calcOffset(start, end, 10, 8).offset],
    ["0%", "100%"],
  );
  const filter = useTransform(
    scrollYProgress,
    [start, calcOffset(start, end, 10, 8).offset],
    ["drop-shadow(0px 0px 0px #0A192F)", "drop-shadow(0px 0px 20px #40E0D0)"],
  );
  const backgroundColor = useTransform(
    scrollYProgress,
    [calcOffset(start, end, 10, 8).offset, end],
    ["var(--sub-alt-color)", "var(--main-color)"],
  );

  const parity = reverse ? -1 : 1;
  const translateX = parity * (h - h * multiplyer);
  const translateY = h * multiplyer;

  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <div
      className={`absolute w-1`}
      style={{
        translate: `${translateX}vh -${translateY}vh`,
        height: `${2 * h}vh`,
        top: `${3 * h}vh`,
        rotate: reverse ? "45deg" : "-45deg",
      }}
    >
      <motion.div
        className={`absolute -z-30 h-full w-full rounded bg-[var(--sub-alt-color)]`}
      />
      <motion.div
        style={{ height, filter }}
        className={`absolute -z-20 w-full rounded bg-[var(--main-color)]`}
      />
      <motion.div
        className={`absolute bottom-0 -z-10 size-5 rounded-full bg-[var(--sub-alt-color)]`}
        style={{
          rotate: reverse ? "-45deg" : "45deg",
          translate: "-50% 50%",
          backgroundColor,
        }}
      >
        <AnimatePresence>
          {scrollState >= end && (
            <motion.div
              className="flex h-fit w-[80vw] flex-col gap-3 rounded-xl bg-[var(--sub-alt-color)] p-7 text-[var(--text-color)] shadow lg:w-[25vw]"
              style={{
                translateX: isDesktop
                  ? reverse
                    ? "calc(-100%)"
                    : "20px"
                  : reverse
                    ? "10px"
                    : "-100%",
                translateY: "calc(-50% + 10px)",
              }}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                margin: `0 ${20 * parity}px`,
              }}
              exit={{
                opacity: 0,
              }}
              layout
            >
              <h1 className="text-xl lg:text-3xl text-[var(--sub-text-color)]">
                {experience.position}
              </h1>
              <h1 className="text-[var(--main-color)]">
                @ {experience.location}
              </h1>
              <div className="font-semibold">
                {formatDate(experience.startDate)} -{" "}
                {formatDate(experience.endDate)}
              </div>
              <ul>
                {experience.details.map((line, i) => (
                  <li
                    className="list-inside list-disc"
                    key={`experience-${experience.location}-${i}`}
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
