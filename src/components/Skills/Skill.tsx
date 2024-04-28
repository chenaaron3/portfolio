import { AnimatePresence, motion } from "framer-motion";
import { type SkillDetails } from ".";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SkillProps {
  details: SkillDetails;
}

export const Skill: React.FC<SkillProps> = ({ details }) => {
  return (
    <div className="m-5 flex h-[10vh] min-w-[40vw] flex-col items-center justify-center rounded-xl bg-[var(--sub-alt-color)] shadow-lg lg:h-[15vh] lg:min-w-[15vw]">
      <div className="absolute top-0 size-8 lg:size-12">
        <Image
          layout="fill"
          objectFit="contain"
          alt="C++"
          src={details.image}
        />
      </div>
      <div className="mt-2 text-xl lg:text-4xl text-[var(--text-color)]">
        {details.name}
      </div>
      <Proficiency proficiency={details.proficiency} />
    </div>
  );
};

interface ProficiencyProps {
  proficiency: number;
}

const Proficiency: React.FC<ProficiencyProps> = ({ proficiency }) => {
  const [prof] = useState(proficiency);
  const [hover, setHover] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (prof == 1) {
      setDescription("Familiar");
    } else if (prof == 2) {
      setDescription("Comfortable");
    } else if (prof == 3) {
      setDescription("Proficient");
    }
  }, [prof]);

  return (
    <div
      className="relative mt-4 flex h-3 w-full"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AnimatePresence>
        {hover && (
          <motion.span
            className="absolute w-full text-sm text-center text-[var(--text-color)]"
            animate={{ y: -10, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
          >
            {description}
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!hover && (
          <div className="w-1/2 lg:w-1/3 m-auto flex gap-2">
            {Array.from({ length: prof }).map((_, i) => {
              return (
                <motion.div
                  key={`proficient-${i}`}
                  className="h-[2px] flex-1 bg-[var(--main-color)]"
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                />
              );
            })}
            {Array.from({ length: 3 - prof }).map((_, i) => {
              return (
                <motion.div
                  key={`unproficient-${i}`}
                  className="h-[2px] flex-1 bg-[var(--bg-color)]"
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
