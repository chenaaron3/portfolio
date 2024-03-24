import { useTransform, type MotionValue, motion } from "framer-motion";
import { type SkillDetails } from ".";
import { Skill } from "./Skill";
import { useEffect, useState } from "react";

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
  const translateRange = reverse ? ["-150%", "150%"] : ["150%", "-150%"];
  const translateX = useTransform(scrollState, [0, 1], translateRange);

  const [details, setDetails] = useState<SkillDetails[]>([]);

  useEffect(() => {
    // Sort from high proficiency to lower
    skills.sort((a, b) => b.proficiency - a.proficiency);
    setDetails(skills);
  }, [skills]);

  return (
    <div
      className="mx-auto w-2/3 overflow-hidden bg-gradient-to-r from-transparent via-[var(--bg-color)] p-2
    "
    >
      <motion.div
        className="relative flex items-center justify-center"
        style={{ translateX, flexDirection: reverse ? "row-reverse" : "row" }}
      >
        <span className="text-center text-4xl text-[var(--text-color)]">
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
