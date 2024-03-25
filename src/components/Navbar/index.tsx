import { type FC, useState, useEffect, useCallback, useRef } from "react";
import {
  AnimatePresence,
  motion,
  type Variants,
  useScroll,
  useAnimationControls,
  useMotionValueEvent,
} from "framer-motion";
import { COVER_DELAY } from "~/utils/constants";
import { useScrollStore } from "~/store";

const listVariants: Variants = {
  visible: {
    top: 0,
    transition: {
      staggerChildren: 0.15,
      delayChildren: COVER_DELAY,
    },
  },
  hidden: {},
};

const itemVariants: Variants = {
  visible: {
    opacity: 1,
    top: 0,
  },
  hidden: {
    opacity: 0,
    top: -20,
  },
};

const logoVariants: Variants = {
  visible: {
    opacity: [0, 0.5, 1],
    scale: [0.5, 0.75, 0.5],
    transition: {
      duration: 0.5,
      delay: COVER_DELAY,
    },
  },
  hidden: {
    opacity: 0,
    scale: 0.125,
  },
  hover: {
    scale: 0.6,
    rotate: -2,
    cursor: "pointer",
  },
};

const containerVariants: Variants = {
  scrolled: {
    width: "90vw",
    marginLeft: "5vw",
    top: "2vh",
    borderRadius: "15px",
    height: "7vh",
    zIndex: 50,
    opacity: 1,
  },
  initial: {
    width: "100vw",
    marginLeft: 0,
    top: 0,
    borderRadius: 0,
    height: "10vh",
    zIndex: 50,
    opacity: 1,
  },
  hidden: {
    opacity: 0,
    zIndex: 10,
    top: "-10vh",
  },
};

export default function Navbar() {
  const controls = useAnimationControls();
  const { scrollY } = useScroll();

  useEffect(() => {
    void controls.start("initial", {
      delay: COVER_DELAY - 0.5,
    });
  }, [controls]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // If scroll down
    if (scrollY.getVelocity() > 0) {
      void controls.start("hidden");
    } else {
      // If scroll up
      if (latest < 100) {
        void controls.start("initial");
      } else {
        void controls.start("scrolled");
      }
    }
  });

  return (
    <motion.div
      className="fixed top-0 m-auto flex h-[10vh] items-center justify-between bg-[var(--sub-alt-color)] text-[var(--text-color)] shadow-lg"
      variants={containerVariants}
      initial={"hidden"}
      animate={controls}
      transition={{
        duration: 0.25,
      }}
      layout
    >
      <motion.svg
        width="200"
        height="100"
        viewBox="0 0 200 100"
        xmlns="http://www.w3.org/2000/svg"
        className="relative scale-50"
        initial="hidden"
        animate="visible"
        variants={logoVariants}
        onClick={() => {
          const section = document.querySelector(`#Home`);
          if (section != null) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
      >
        <g stroke="#000" fill="none">
          <motion.path
            d="M 92.4 48.6 L 92.4 49 A 1.201 1.201 0 0 1 92.393 49.134 Q 92.363 49.4 92.2 49.4 A 0.362 0.362 0 0 1 91.994 49.329 Q 91.86 49.237 91.726 49.026 A 2.582 2.582 0 0 1 91.6 48.8 A 2.263 2.263 0 0 0 91.081 48.002 Q 90.551 47.454 89.572 47 A 9.031 9.031 0 0 0 89.35 46.9 A 19.212 19.212 0 0 0 87.229 46.135 A 25.806 25.806 0 0 0 85.1 45.6 A 69.801 69.801 0 0 0 81.753 44.985 A 60.121 60.121 0 0 0 80.5 44.8 Q 78.816 44.57 77.776 44.458 A 34.16 34.16 0 0 0 77.2 44.4 L 76.1 44.3 Q 67.8 52.3 58.95 59.05 Q 50.1 65.8 40.2 69.2 Q 35.5 70.8 31.05 71.5 A 57.918 57.918 0 0 1 25.403 72.117 A 48.486 48.486 0 0 1 22.6 72.2 A 50.411 50.411 0 0 1 17.462 71.951 Q 14.344 71.631 11.7 70.9 A 38.582 38.582 0 0 1 9.519 70.231 Q 7.208 69.442 5.787 68.553 A 8.317 8.317 0 0 1 5 68 A 15.844 15.844 0 0 1 2.31 65.379 A 10.039 10.039 0 0 1 0 59 Q 0 55.204 2.923 51.369 A 21.783 21.783 0 0 1 3.75 50.35 A 23.862 23.862 0 0 1 7.282 47.059 Q 10.508 44.574 15.2 42.35 Q 22.9 38.7 34.6 36.6 Q 39.6 35.7 44.75 35.2 Q 49.9 34.7 55.1 34.7 Q 59.5 34.7 63.95 35.1 Q 68.4 35.5 72.7 36.4 Q 74.1 36.7 75.9 37.15 Q 77.7 37.6 79.6 38.2 Q 87.9 29.7 95.8 21.3 Q 103.7 12.9 111.1 7.1 Q 115.081 3.961 118.652 2.346 A 22.435 22.435 0 0 1 120.8 1.5 Q 125.3 0 128.8 0 A 22.2 22.2 0 0 1 131.56 0.162 Q 132.984 0.34 134.178 0.717 A 10.885 10.885 0 0 1 135.55 1.25 A 35.557 35.557 0 0 1 136.691 1.811 Q 138.264 2.624 138.905 3.21 A 2.91 2.91 0 0 1 139 3.3 A 0.676 0.676 0 0 1 139.077 3.392 Q 139.254 3.646 139 3.9 A 0.676 0.676 0 0 1 138.909 3.978 Q 138.654 4.154 138.4 3.9 Q 137.936 3.344 136.268 2.701 A 19.529 19.529 0 0 0 136 2.6 A 9.893 9.893 0 0 0 134.42 2.174 Q 132.975 1.9 131.1 1.9 A 20.027 20.027 0 0 0 127.887 2.179 Q 126.316 2.435 124.566 2.926 A 41.789 41.789 0 0 0 122.4 3.6 Q 117.4 5.3 111.3 10 A 138.002 138.002 0 0 0 101.058 18.94 A 161.97 161.97 0 0 0 96.45 23.55 Q 89.1 31.2 81.5 38.9 Q 85.4 40.3 88.65 42.7 A 10.556 10.556 0 0 1 90.769 44.743 A 8.111 8.111 0 0 1 92.4 48.6 Z M 95.609 73.104 A 21.237 21.237 0 0 0 99.9 77.1 Q 100.136 77.257 100.309 77.168 A 0.365 0.365 0 0 0 100.4 77.1 Q 100.6 76.9 100.6 76.7 A 0.703 0.703 0 0 0 100.597 76.634 Q 100.583 76.483 100.5 76.4 Q 98.7 74.5 97.9 72 Q 97.1 69.5 97.1 66.5 Q 97.1 61.3 99.05 55 A 82.509 82.509 0 0 1 100.391 51.033 A 96.687 96.687 0 0 1 104.2 42.1 Q 107.4 35.5 111.1 29.25 A 193.23 193.23 0 0 1 114.09 24.362 A 154.127 154.127 0 0 1 118.4 17.9 Q 122 12.8 124.6 9.5 Q 125.1 8.8 125.1 7.2 A 5.722 5.722 0 0 0 125.067 6.575 A 4.456 4.456 0 0 0 124.9 5.75 A 2.327 2.327 0 0 0 124.887 5.71 Q 124.688 5.1 124.3 5.1 Q 124 5.1 123.4 5.9 Q 122.994 6.469 121.168 8.556 A 286.727 286.727 0 0 1 120.25 9.6 Q 117.6 12.6 113.75 17.15 A 196.924 196.924 0 0 0 110.827 20.689 A 241.292 241.292 0 0 0 105.8 27.15 Q 101.7 32.6 98.25 38.3 A 65.534 65.534 0 0 0 95.547 43.211 A 50.354 50.354 0 0 0 93 49.3 Q 91.2 54.5 91.2 59.7 Q 91.2 64.9 93.3 69.4 A 18.171 18.171 0 0 0 95.609 73.104 Z M 22.9 70.5 A 48.314 48.314 0 0 0 27.252 70.295 A 61.587 61.587 0 0 0 30.9 69.85 A 60.423 60.423 0 0 0 37.377 68.491 A 70.383 70.383 0 0 0 39.8 67.8 A 50.325 50.325 0 0 0 49.977 63.254 A 65.727 65.727 0 0 0 56.9 58.6 Q 65.4 52.1 73.6 44.1 Q 72.3 44 71 44 L 68.3 44 A 154.212 154.212 0 0 0 56.562 44.462 A 173.939 173.939 0 0 0 53.75 44.7 Q 46.2 45.4 39.4 46.7 A 126.724 126.724 0 0 0 32.017 48.188 Q 25.902 49.624 21.45 51.45 A 55.786 55.786 0 0 0 17.49 53.244 Q 13.491 55.263 11.25 57.4 A 15.713 15.713 0 0 0 9.716 59.073 Q 8.008 61.256 8 63.282 A 4.832 4.832 0 0 0 8 63.3 A 5.156 5.156 0 0 0 9.305 66.716 A 8.273 8.273 0 0 0 10.7 68 A 6.631 6.631 0 0 0 11.69 68.572 Q 13.05 69.223 15.3 69.75 A 26.241 26.241 0 0 0 18.33 70.263 Q 19.9 70.441 21.684 70.485 A 48.716 48.716 0 0 0 22.9 70.5 Z"
            fill="var(--bg-color)"
            stroke="var(--main-color)"
            strokeWidth="2"
            strokeDashoffset="5"
          />
          <motion.path
            d="M 134.7 72.1 Q 129.9 72.1 125.2 70.95 Q 120.5 69.8 116.6 67.3 Q 112.7 64.8 110.4 60.9 Q 108.1 57 108.1 51.5 Q 108.1 46.3 110.2 41.5 Q 112.3 36.7 115.65 32.5 A 68.521 68.521 0 0 1 120.595 26.928 A 59.486 59.486 0 0 1 122.6 25 A 91.876 91.876 0 0 1 129.897 19.092 A 111.179 111.179 0 0 1 134.2 16.1 Q 140.7 11.8 148.05 8.4 Q 155.4 5 162.9 3 Q 170.4 1 177.3 1 A 23.281 23.281 0 0 1 180.643 1.254 A 31.485 31.485 0 0 1 183.85 1.9 A 16.495 16.495 0 0 1 187.713 3.392 A 14.221 14.221 0 0 1 189.95 4.9 A 6.844 6.844 0 0 1 192.403 9.381 A 9.983 9.983 0 0 1 192.5 10.8 Q 192.5 14.2 190.2 17.5 Q 187.9 20.8 184.1 23.7 A 59.619 59.619 0 0 1 177.674 27.957 A 68.121 68.121 0 0 1 175.7 29.05 Q 171.1 31.5 166.35 33.35 A 91.24 91.24 0 0 1 161.18 35.194 A 71.67 71.67 0 0 1 157.4 36.3 A 70.319 70.319 0 0 1 154.549 36.987 Q 152.158 37.508 150.3 37.7 Q 149.6 37.8 148.9 37.8 L 147.5 37.8 A 9.008 9.008 0 0 1 147.175 37.793 Q 146.484 37.767 145 37.65 A 18.014 18.014 0 0 1 142.045 37.175 A 16.261 16.261 0 0 1 141.4 37 Q 140.162 36.636 139.826 36.007 A 1.058 1.058 0 0 1 139.7 35.5 A 0.589 0.589 0 0 1 139.736 35.284 Q 139.837 35.027 140.217 35.003 A 1.292 1.292 0 0 1 140.3 35 Q 140.569 35 140.928 35.09 A 5.165 5.165 0 0 1 141.3 35.2 Q 141.766 35.356 142.414 35.39 A 7.237 7.237 0 0 0 142.8 35.4 Q 145.097 35.4 148.677 34.301 A 42.75 42.75 0 0 0 149 34.2 Q 152.8 33 157.25 30.95 Q 161.7 28.9 166.1 26.3 A 77.155 77.155 0 0 0 172.306 22.231 A 68.159 68.159 0 0 0 174.2 20.8 Q 177.9 17.9 180.1 15 A 13.658 13.658 0 0 0 181.307 13.129 Q 181.866 12.071 182.11 11.055 A 6.631 6.631 0 0 0 182.3 9.5 A 5.334 5.334 0 0 0 182.119 8.068 A 3.664 3.664 0 0 0 180.6 5.95 A 9.568 9.568 0 0 0 177.913 4.704 A 11.902 11.902 0 0 0 176.6 4.4 A 31.793 31.793 0 0 0 174.959 4.156 Q 173.662 4 172.6 4 A 45.578 45.578 0 0 0 162.543 5.16 A 53.123 53.123 0 0 0 159.65 5.9 Q 153 7.8 146.55 11.05 Q 140.1 14.3 134.35 18.3 A 98.916 98.916 0 0 0 127.651 23.378 A 81.477 81.477 0 0 0 124.1 26.5 A 62.119 62.119 0 0 0 120.245 30.457 A 75.517 75.517 0 0 0 117.95 33.15 Q 114.9 36.9 112.9 41.15 Q 110.9 45.4 110.9 49.9 Q 110.9 54.9 113.3 58.3 Q 115.7 61.7 119.55 63.75 Q 123.4 65.8 127.9 66.7 A 46.526 46.526 0 0 0 133.634 67.494 A 39.357 39.357 0 0 0 136.5 67.6 Q 139.1 67.6 141.7 67.35 Q 144.3 67.1 146.8 66.7 A 116.95 116.95 0 0 0 153.974 65.192 A 92.039 92.039 0 0 0 159.05 63.8 Q 164.6 62.1 169.7 59.4 A 57.919 57.919 0 0 0 175.501 55.856 A 74.606 74.606 0 0 0 180.1 52.4 A 7.069 7.069 0 0 1 180.239 52.332 Q 180.519 52.2 180.6 52.2 A 0.589 0.589 0 0 1 180.816 52.237 Q 181.073 52.337 181.097 52.717 A 1.292 1.292 0 0 1 181.1 52.8 Q 181.1 53.099 180.703 53.696 A 6.658 6.658 0 0 1 180.7 53.7 A 41.808 41.808 0 0 1 174.715 58.983 A 51.003 51.003 0 0 1 171.25 61.3 Q 165.7 64.7 159.4 67.1 Q 153.1 69.5 146.7 70.8 A 66.933 66.933 0 0 1 139.753 71.851 A 53.121 53.121 0 0 1 134.7 72.1 Z"
            fill="var(--bg-color)"
            stroke="var(--main-color)"
            strokeWidth="2"
            strokeDashoffset="5"
          />
        </g>
      </motion.svg>
      <motion.ol
        className="mr-32 flex w-[40vw] list-decimal justify-between text-xl text-[var(--main-color)]"
        initial="hidden"
        animate="visible"
        variants={listVariants}
        transition={{
          delay: COVER_DELAY,
        }}
      >
        <NavItem name="About" />
        <NavItem name="Skills" />
        <NavItem name="Experience" />
        <NavItem name="Projects" />
        <NavItem name="Contact" />
      </motion.ol>
    </motion.div>
  );
}

interface NavItemProps {
  name: string;
}

const NavItem: FC<NavItemProps> = ({ name }) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <motion.li
      key={name}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      variants={itemVariants}
      className="relative cursor-pointer"
      onClick={() => {
        const section = document.querySelector(`#${name}`);
        if (section != null) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key={name}
            className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--main-color)]"
            initial={{ visibility: "hidden", scaleX: 0, opacity: 0 }}
            animate={{ visibility: "visible", scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <motion.span
        className="text-[var(--text-color)]"
        animate={
          isHovered
            ? { color: "var(--main-color)" }
            : { color: "var(--text-color)" }
        }
      >
        {name}
      </motion.span>
    </motion.li>
  );
};
