import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Branch } from "./Branch";

export interface ExperienceDetails {
  location: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  details: string[];
}

export default function Experience() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <div
    id="Experience"
      className="relative flex h-[200vh] w-screen flex-col items-center mb-[15vh]"
      ref={ref}
    >
      <motion.div
        className="sticky top-1/4 flex w-full flex-col items-center gap-16"
        style={{
          translateY,
        }}
      >
        <h1 className="text-center text-5xl text-[var(--sub-text-color)]">
          A timeline of my{" "}
          <span className="text-[var(--main-color)]">experiences</span>
        </h1>
        <div>
          <Branch
            scrollYProgress={scrollYProgress}
            start={0}
            end={0.25}
            experience={{
              location: "UC Irvine",
              position: "Bachelors Degree in Computer Science",
              startDate: new Date("09/01/2018"),
              endDate: new Date("12/01/2021"),
              details: ["GPA: 3.959"],
            }}
          />
          <Branch
            scrollYProgress={scrollYProgress}
            start={0.25}
            end={0.5}
            reverse
            experience={{
              location: "L3Harris Technologies",
              position: "Software Engineer Intern",
              startDate: new Date("06/01/2020"),
              endDate: new Date("06/01/2021"),
              details: [
                "Worked on a GPS Receiver tool in C# under the Navigation System department.",
              ],
            }}
          />
          <Branch
            scrollYProgress={scrollYProgress}
            start={0.5}
            end={0.75}
            experience={{
              location: "Lockheed Martin Space",
              position: "Software Engineer Intern",
              startDate: new Date("06/01/2021"),
              endDate: new Date("12/01/2021"),
              details: [
                "Designed and implemented Python scripts for testing satellite database commands, ensuring data integrity and system reliability for mission critical software.",
              ],
            }}
          />
          <Branch
            scrollYProgress={scrollYProgress}
            start={0.75}
            end={1}
            reverse
            experience={{
              location: "Rubrik",
              position: "Full Stack Software Engineer",
              startDate: new Date("03/01/2022"),
              details: [
                "Designed a cloud service to identify malicious files in customer data centers, enabling scanning of one million systems per month.",
              ],
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
