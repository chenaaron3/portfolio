import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { calcOffset } from "~/utils/animation";
import { type ExperienceDetails } from ".";
import { SlantBar, StraightBar } from "./Bars";


interface BranchProps {
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
  reverse?: boolean;
  experience: ExperienceDetails;
}

export const Branch: React.FC<BranchProps> = ({
  start,
  end,
  scrollYProgress,
  reverse,
  experience,
}) => {
  const filter = useTransform(
    scrollYProgress,
    [start, calcOffset(start, end, 10, 1).offset],
    ["drop-shadow(0px 0px 0px #0A192F)", "drop-shadow(0px 0px 20px #40E0D0)"],
  );
  const backgroundColor = useTransform(
    scrollYProgress,
    [start, calcOffset(start, end, 10, 1).offset],
    ["var(--sub-alt-color)", "var(--main-color)"],
  );
  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        className="absolute z-20 size-5 translate-y-[-50%] rounded-full bg-[var(--sub-alt-color)]"
        style={{
          filter,
          backgroundColor,
        }}
      ></motion.div>
      <StraightBar
        scrollYProgress={scrollYProgress}
        start={calcOffset(start, end, 10, 1).offset}
        end={calcOffset(start, end, 10, 7).offset}
      />
      <SlantBar
        scrollYProgress={scrollYProgress}
        start={calcOffset(start, end, 10, 7).offset}
        end={end}
        reverse={reverse}
        experience={experience}
      />
    </div>
  );
};
