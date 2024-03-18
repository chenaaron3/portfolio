import { calcOffset } from "~/utils/animation";
import { Key } from "./Key";
import { HeroKeyframes } from ".";

interface KeysProps {
  scrollState: number;
}

export const Keys: React.FC<KeysProps> = ({ scrollState }) => {
  return (
    <>
      <div className="flex justify-center gap-3">
        <Key
          character={"S"}
          forcePress={
            scrollState >
            calcOffset(
              HeroKeyframes.seeMoreFadeIn,
              HeroKeyframes.seeMorePressed,
              8,
              0,
            ).offset
          }
        />
        <Key
          character={"E"}
          forcePress={
            scrollState >
            calcOffset(
              HeroKeyframes.seeMoreFadeIn,
              HeroKeyframes.seeMorePressed,
              8,
              1,
            ).offset
          }
        />
        <Key
          character={"E"}
          forcePress={
            scrollState >
            calcOffset(
              HeroKeyframes.seeMoreFadeIn,
              HeroKeyframes.seeMorePressed,
              8,
              2,
            ).offset
          }
        />
      </div>
      <div className="flex justify-center gap-3">
        <Key
          character={"M"}
          forcePress={
            scrollState >
            calcOffset(
              HeroKeyframes.seeMoreFadeIn,
              HeroKeyframes.seeMorePressed,
              8,
              3,
            ).offset
          }
        />
        <Key
          character={"O"}
          forcePress={
            scrollState >
            calcOffset(
              HeroKeyframes.seeMoreFadeIn,
              HeroKeyframes.seeMorePressed,
              8,
              4,
            ).offset
          }
        />
        <Key
          character={"R"}
          forcePress={
            scrollState >
            calcOffset(
              HeroKeyframes.seeMoreFadeIn,
              HeroKeyframes.seeMorePressed,
              8,
              5,
            ).offset
          }
        />
        <Key
          character={"E"}
          forcePress={
            scrollState >
            calcOffset(
              HeroKeyframes.seeMoreFadeIn,
              HeroKeyframes.seeMorePressed,
              8,
              6,
            ).offset
          }
        />
      </div>
      <div className="flex justify-center gap-3 ">
        <Key
          character={"↓"}
          forcePress={
            scrollState >
            calcOffset(
              HeroKeyframes.seeMoreFadeIn,
              HeroKeyframes.seeMorePressed,
              8,
              7,
            ).offset
          }
          bouncy
        />
      </div>
    </>
  );
};
