import { useState } from "react";
import RabbitCard from "./RabbitCard";

interface IRabbitCardContainer {
  card: string;
  idx: number;
}

const RabbitCardContainer = ({ card, idx }: IRabbitCardContainer) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  return (
    <div onClick={() => setShouldAnimate(true)}>
      <RabbitCard
        idx={idx}
        card={card}
        animate={shouldAnimate}
        isFlop={false}
      />
    </div>
  );
};

export default RabbitCardContainer;
