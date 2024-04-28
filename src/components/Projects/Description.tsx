import { AnimatePresence, motion } from "framer-motion";
import { ProjectDetails } from ".";

interface DescriptionProps {
  project: ProjectDetails;
}

export const Description: React.FC<DescriptionProps> = ({ project }) => {
  return (
    <motion.div
      key={`project-description-${project.name}`}
      className="w-full p-3 lg:p-14 gap-3 flex flex-col"
      initial={{
        opacity: 0.0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0.0,
      }}
    >
      <p className="text-3xl text-[var(--sub-text-color)]">{project.name}</p>
      <p className="text-lg text-[var(--text-color)]">{project.description}</p>
      <div className="flex text-sm gap-5 flex-wrap">
        {
            project.tags.map(tag => (<span 
            className="bg-teal-900 text-[var(--main-color)] font-semibold py-1 px-2 rounded-full"
            key={`project-tag-${project.name}-${tag}`}>
                {tag}
            </span>))
        }
      </div>
    </motion.div>
  );
};
