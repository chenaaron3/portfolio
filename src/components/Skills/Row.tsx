import { useTransform, type MotionValue, motion } from "framer-motion";
import { type SkillDetails } from ".";
import { Skill } from "./Skill";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface RowProps {
  scrollState: MotionValue<number>;
  title: string;
  skills: SkillDetails[];
  reverse?: boolean;
}

export const Row: React.FC<RowProps> = ({
  reverse,
  scrollState,
  title,
  skills,
}) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const translateX = useTransform(() => {
    const scroll = scrollState.get()
    const width = isDesktop ? 30 : 70
    return (reverse ? "" : "-") + (scroll * skills.length * width) + "%"
  });
  const [details, setDetails] = useState<SkillDetails[]>([]);

  useEffect(() => {
    // Sort from high proficiency to lower
    skills.sort((a, b) => b.proficiency - a.proficiency);
    setDetails(skills);
  }, [skills]);

  return (
    <div className="mx-auto w-full lg:w-2/3 overflow-hidden bg-gradient-to-r from-transparent via-[var(--bg-color)] p-2">
      <motion.div
        layout
        className="relative flex items-center"
        style={{
          flexDirection: reverse ? "row-reverse" : "row",
          translateX,
        }} 
      >
        <div className="min-w-[25vw] h-1"></div>
        <span className="text-center text-2xl lg:text-4xl text-[var(--text-color)]">
          {title}
        </span>
        <span className="m-7" />
        {details.map((skill, i) => {
          return <Skill key={`skill-1-${i}`} details={skill} />;
        })}
      </motion.div>
    </div>
  );
};
