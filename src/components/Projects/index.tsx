import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";

import PeterPortal from "../../../public/images/projects/peterportal.jpg";
import Stocks from "../../../public/images/projects/stocks.jpg";
import Syft from "../../../public/images/projects/syft.jpg";
import { Description } from "./Description";
import { calcOffset } from "~/utils/animation";

export interface ProjectDetails {
  name: string;
  description: string;
  image: StaticImageData;
  tags: string[];
}

const projects: ProjectDetails[] = [
  {
    name: "Syft",
    description:
      "A software as a service that converts lengthy youtube videos into digestible short-form clips.",
    image: Syft,
    tags: ["NextJS", "Python", "ChatGPT", "AWS"],
  },
  {
    name: "Backtesting Stocks",
    description:
      "A simulator that tests technical trading strategies against thousands of historical stock data.",
    image: Stocks,
    tags: ["React", "Express", "MongoDB"],
  },
  {
    name: "Peter Portal",
    description:
      "A platform aimed to help UCI students with course discovery and planning.",
    image: PeterPortal,
    tags: ["React", "Elasticsearch"],
  },
];

const offsets = projects.map((_, i) => {
  return calcOffset(0, 1, projects.length, i);
});

export default function Projects() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [activeProject, setActiveProject] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    projects.forEach((_, i) => {
      const offset = offsets[i]!;
      if (latest >= offset.offset && latest <= offset.nextOffset) {
        setActiveProject(i);
      }
    });
  });

  return (
    <div id="Projects" className="relative h-[300vh] w-screen " ref={ref}>
      <div className="sticky top-0 flex h-screen flex-col items-center pt-[15vh]">
        <h1 className="text-center text-3xl text-[var(--sub-text-color)] lg:text-5xl">
          Showcasing my{" "}
          <span className="text-[var(--main-color)]">projects</span>
        </h1>
        <div className="m-auto flex h-full w-full flex-col lg:h-[40vh] lg:flex-row">
          <div className="flex w-full h-1 lg:h-full lg:w-1 flex-row lg:flex-col gap-3 lg:pl-5 mt-10 lg:mt-0">
            {projects.map((_, i) => (
              <div
                key={`project-divider-${i}`}
                className="min-h-1 lg:min-w-1 flex-1 rounded-full bg-[var(--sub-alt-color)]"
              >
                {activeProject == i && (
                  <motion.div
                    layoutId="projecttab"
                    className="h-full w-full rounded-full bg-[var(--main-color)]"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="relative flex flex-1 flex-col items-center justify-center">
            <AnimatePresence mode="popLayout">
              {projects.map((project, i) => {
                return activeProject == i && <Description project={project} />;
              })}
            </AnimatePresence>
          </div>
          <div className="flex-1">
            <AnimatePresence mode="popLayout">
              {projects.map((project, i) => {
                return (
                  activeProject == i && (
                    <motion.div
                      key={`project-image-${project.name}`}
                      className="relative h-full"
                      initial={{
                        opacity: 0,
                        translateY: "15%",
                      }}
                      animate={{
                        opacity: 1,
                        translateY: "0%",
                      }}
                      exit={{
                        opacity: 0,
                        translateY: "-15%",
                      }}
                    >
                      <Image
                        layout="fill"
                        objectFit="contain"
                        alt="project"
                        src={project.image}
                      />
                    </motion.div>
                  )
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
