import { useScroll } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div className="relative flex h-[300vh] w-screen justify-center">
      <div className="sticky top-1/2 h-[60vh] w-[50vw] -translate-y-1/2 rounded-xl bg-[var(--sub-alt-color)]">
        <div className="absolute flex h-14 w-full items-center rounded-t-xl bg-[var(--sub-color)] text-2xl">
          <div className="absolute ml-3 flex gap-3">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <span className="m-auto font-semibold text-[var(--text-color)]">
            About Me
          </span>
        </div>
        <div className="mt-10 p-5 text-3xl text-[var(--text-color)]">
          <div>
            <span>&gt;_</span>
          </div>

          <p>
            Hello World! My name is Aaron Chen and I am a Software Engineer at
            Rubrik.
          </p>
          <p>
            As a computer scientist, my goal is to always be learning. Whether
            it be picking up a new web development framework or studying a new
            scheduling algorithm, I always strive to further my skills and
            broaden my knowledge.
          </p>
          <p>
            To achieve this goal, I follow the principles of 'Learn By Doing'.
            The majority of my learning process involves hands-on projects. This
            portfolio showcases some of those projects.
          </p>
        </div>
      </div>
    </div>
  );
}
