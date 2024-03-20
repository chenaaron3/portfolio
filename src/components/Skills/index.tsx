import C from "./c";

interface Skill {
  name: string;
  image: React.ReactNode;
}

export default function Skills() {
  const skills1: Skill[] = [
    {
      image: <C />,
      name: "C",
    },
    {
      image: <C />,
      name: "C",
    },
    {
      image: <C />,
      name: "C",
    },
  ];

  const skills2: Skill[] = [
    {
      image: <C />,
      name: "C",
    },
    {
      image: <C />,
      name: "C",
    },
    {
      image: <C />,
      name: "C",
    },
  ];

  return (
    <div className="flex justify-center items-center flex-col">
      {skills1.map((skill, i) => {
        return (
          <div key={`skill-1-${i}`} className="bg-[var(--sub-alt-color)] w-[10vw] h-[15vh] flex flex-col justify-center items-center m-5 rounded-xl">
            <div className="text-[var(--text-color)] text-5xl">{skill.name}</div>
            {skill.image}
          </div>
        );
      })}
    </div>
  );
}
