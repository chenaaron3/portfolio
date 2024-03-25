import { useRef } from "react";
import C from "../../../public/images/C.png";
import CSharp from "../../../public/images/CSharp.png";
import CPP from "../../../public/images/C++.png";
import Golang from "../../../public/images/Golang.png";
import Java from "../../../public/images/Java.png";
import Javascript from "../../../public/images/Javascript.png";
import Python from "../../../public/images/Python.png";
import Typescript from "../../../public/images/Typescript.png";

import AWS from "../../../public/images/AWS.png";
import GCP from "../../../public/images/GCP.png";
import Docker from "../../../public/images/Docker.png";
import React from "../../../public/images/React.png";
import NextJS from "../../../public/images/NextJS.png";
import Jenkins from "../../../public/images/Jenkins.png";
import GraphQL from "../../../public/images/GraphQL.png";
import SQL from "../../../public/images/SQL.png";

import { useScroll } from "framer-motion";
import { Row } from "./Row";
import Image, { type StaticImageData } from "next/image";

export interface SkillDetails {
  name: string;
  image: StaticImageData;
  proficiency: number;
}

export default function Skills() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const languages: SkillDetails[] = [
    {
      image: C,
      name: "C",
      proficiency: 1,
    },
    {
      image: CSharp,
      name: "C#",
      proficiency: 1,
    },
    {
      image: CPP,
      name: "C++",
      proficiency: 2,
    },
    {
      image: Golang,
      name: "Golang",
      proficiency: 2,
    },
    {
      image: Java,
      name: "Java",
      proficiency: 2,
    },
    {
      image: Javascript,
      name: "Javascript",
      proficiency: 3,
    },
    {
      image: Python,
      name: "Python",
      proficiency: 3,
    },
    {
      image: Typescript,
      name: "Typescript",
      proficiency: 3,
    },
  ];

  const tech: SkillDetails[] = [
    {
      image: AWS,
      name: "AWS",
      proficiency: 2,
    },
    {
      image: GCP,
      name: "GCP",
      proficiency: 1,
    },
    {
      image: Docker,
      name: "Docker",
      proficiency: 2,
    },
    {
      image: React,
      name: "React",
      proficiency: 3,
    },
    {
      image: NextJS,
      name: "NextJS",
      proficiency: 2,
    },
    {
      image: Jenkins,
      name: "Jenkins",
      proficiency: 1,
    },
    {
      image: GraphQL,
      name: "GraphQL",
      proficiency: 2,
    },
    {
      image: SQL,
      name: "SQL",
      proficiency: 2,
    },
  ];

  return (
    <div id="Skills" className="relative h-[500vh] w-screen" ref={ref}>
      <div className="mt-[25vh]"></div>
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center gap-16">
        <h1 className="text-center text-5xl text-[var(--sub-text-color)]">
          Here are some of my{" "}
          <span className="text-[var(--main-color)]">skills</span>
        </h1>
        <Row
          scrollState={scrollYProgress}
          title="Programming Languages"
          skills={languages}
        />
        <Row
          scrollState={scrollYProgress}
          title="Technologies"
          skills={tech}
          reverse
        />
      </div>
    </div>
  );
}
