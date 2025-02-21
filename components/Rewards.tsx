"use client";

import { useEffect, useState } from "react";
import { useReward } from "react-rewards";

function Reward({ type }: { type: "balloons" | "confetti" | "emoji" }) {
  const rewardConfig = {
    elementCount: 70,
    spread: 140,
    decay: 0.96,
    lifetime: 100,
    startVelocity: 26,
  };
  const [isAnimateFinished, setIsAnimateFinished] = useState(false);
  const { reward } = useReward("reward", type, { ...rewardConfig, angle: 60 });
  const { reward: rewardTwo } = useReward("rewardTwo", type, {
    ...rewardConfig,
    angle: 120,
    onAnimationComplete() {
      setIsAnimateFinished(true);
    },
  });
  useEffect(() => {
    if (isAnimateFinished) return;
    reward();
    rewardTwo();
  }, [reward, rewardTwo, isAnimateFinished]);
  return (
    <>
      <span className="absolute bottom-0 left-0" id="reward" />
      <span className="absolute bottom-0 right-0" id="rewardTwo" />
    </>
  );
}

export default Reward;
