import Image from "next/image";
import {
  MotionValue,
  motion,
  useAnimate,
  useAnimationControls,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { AboutKeyframes } from ".";

interface AvatarProps {
  scrollYProgress: MotionValue<number>;
}

export const Avatar: React.FC<AvatarProps> = ({ scrollYProgress }) => {
  const rotate = useTransform(
    scrollYProgress,
    [
      AboutKeyframes.pictureFadeIn,
      AboutKeyframes.pictureFadeInEnd,
    ],
    ["-60deg", "0deg"],
  );
  const scale = useTransform(
    scrollYProgress,
    [
      AboutKeyframes.pictureFadeIn,
      AboutKeyframes.pictureFadeInEnd,
    ],
    [0.1, 1],
  );
  const right = useTransform(
    scrollYProgress,
    [
      AboutKeyframes.pictureFadeIn,
      AboutKeyframes.pictureFadeInEnd,
    ],
    ["50%", "0%"],
  );

  return (
    <motion.div
      className="relative flex h-full w-full items-center justify-center"
      style={{
        right,
      }}
    >
      <motion.div
        id="ball"
        className="relative h-[40vh] w-[40vh] overflow-hidden rounded-full"
        style={{
            rotate,
                    scale,
        }}
      >
        <Image layout="fill" src="/photo.jpg" alt="photo"></Image>
      </motion.div>
    </motion.div>
  );
};
