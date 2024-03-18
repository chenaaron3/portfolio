import {
  type Variants,
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { HeroKeyframes } from ".";

interface PowerProps {
  scrollState: MotionValue<number>;
}

const variants: Variants = {
  hidden: {
    opacity: 0.25,
    scale: 0.5,
  },
  visible: {
    scale: 1,
    opacity: 1,
  },
};

export const Power: React.FC<PowerProps> = ({ scrollState }) => {
  const fill = useTransform(
    scrollState,
    [HeroKeyframes.powerFadeIn, HeroKeyframes.powerFinish],
    ["#0A192F", "#40E0D0"],
  );

  const filter = useTransform(
    scrollState,
    [HeroKeyframes.powerFadeIn, HeroKeyframes.powerFinish],
    ["drop-shadow(0px 0px 0px #0A192F)", "drop-shadow(0px 0px 20px #40E0D0)"],
  )

  const scale = useTransform(
    scrollState,
    [HeroKeyframes.powerFadeIn, HeroKeyframes.powerFinish],
    [1, 1.15],
  );

  return (
    <motion.div className="absolute inset-0 flex h-full items-center justify-center">
      <motion.svg
        height="35%"
        width="35%"
        viewBox="0 0 30.143 30.143"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        style={{ fill, filter, scale }}        
      >
        <g>
          <path
            d="M20.034,2.357v3.824c3.482,1.798,5.869,5.427,5.869,9.619c0,5.98-4.848,10.83-10.828,10.83
		c-5.982,0-10.832-4.85-10.832-10.83c0-3.844,2.012-7.215,5.029-9.136V2.689C4.245,4.918,0.731,9.945,0.731,15.801
		c0,7.921,6.42,14.342,14.34,14.342c7.924,0,14.342-6.421,14.342-14.342C29.412,9.624,25.501,4.379,20.034,2.357z"
          />
          <path
            d="M14.795,17.652c1.576,0,1.736-0.931,1.736-2.076V2.08c0-1.148-0.16-2.08-1.736-2.08
		c-1.57,0-1.732,0.932-1.732,2.08v13.496C13.062,16.722,13.225,17.652,14.795,17.652z"
          />
        </g>
      </motion.svg>
    </motion.div>
  );
};
