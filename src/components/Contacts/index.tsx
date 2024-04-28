import { motion, useMotionValue } from "framer-motion";
import { Power } from "../Hero/Power";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Image from "next/image";

export default function Contacts() {
  const power = useMotionValue(0.85);

  return (
    <div id="Contact" className="flex h-screen w-full flex-col items-center">
      <h1 className="mt-[15vh] text-center text-3xl lg:text-5xl text-[var(--sub-text-color)]">
        Let&apos;s get in{" "}
        <span className="text-[var(--main-color)]">contact</span>
      </h1>
      <CardContainer>
        <CardBody className="group/card relative flex h-auto w-5/6 lg:w-auto flex-col items-center justify-center gap-3 rounded-xl bg-[var(--sub-alt-color)] p-12 text-[var(--text-color)]">
          <CardItem
            translateZ={20}
            className="absolute right-5 top-5 m-auto h-[2vh] w-[2vh]"
          >
            <Power scrollState={power} />
          </CardItem>
          <CardItem translateZ={60} className="text-2xl lg:text-3xl font-bold">
            Aaron Chen
          </CardItem>
          <CardItem translateZ={50} className="text-center">Full Stack Software Engineer</CardItem>
          <CardItem translateZ={40}>chenaaron3@gmail.com</CardItem>
          <CardItem translateZ={30}>408-455-7370</CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
}
