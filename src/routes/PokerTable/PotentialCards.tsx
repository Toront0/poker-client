import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import RabbitCard from "./RabbitCard";
import { ITable } from "../../shared/interfaces/pokerTable.interface";

interface IPotentialCards {
  cards: string[];
  idx?: number;
  setData: Dispatch<SetStateAction<ITable>>;
}

const PotentialCards = ({ cards, idx, setData }: IPotentialCards) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const timerRef = useRef<number>();

  useEffect(() => {
    if (cards.length > 0 && !shouldAnimate) {
      timerRef.current = setTimeout(() => {
        setData((p) => ({ ...p, potentialStreetCards: [] }));
      }, 4000);

      return () => {
        clearInterval(timerRef.current);
        timerRef.current = undefined;
      };
    }
  }, [cards, shouldAnimate]);

  return (
    <div
      onClick={() => setShouldAnimate(true)}
      className="h-full cursor-pointer"
    >
      {cards.map((c, i) => (
        <RabbitCard
          key={i}
          idx={idx || i}
          card={c}
          animate={shouldAnimate}
          isFlop={cards.length === 3}
        />
      ))}
    </div>
  );
};

export default PotentialCards;
