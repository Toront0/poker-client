import { Dispatch, SetStateAction } from "react";
import { stringToCardImg } from "../../lib/functions/helpers";
import PotentialCards from "./PotentialCards";
import { ITable } from "../../shared/interfaces/pokerTable.interface";

interface IPokerTableCards {
  flop: string[];
  turn: string;
  river: string;
  potentialStreetCards: string[];
  setData: Dispatch<SetStateAction<ITable>>;
}

const PokerTableCards = ({
  flop,
  turn,
  river,
  potentialStreetCards,
  setData
}: IPokerTableCards) => {
  return (
    <div className="h-[50px] xl:h-[140px] relative  w-36 md:w-[220px] xl:w-[370px] flop-deck  flex justify-center gap-4 items-start ">
      {flop?.length > 0 ? (
        <>
          {flop.map((c, i) => (
            <div className={`flop-card-${i + 1}`}>
              <img
                src={stringToCardImg(c)}
                alt=""
                className="w-[30px] md:w-[40px]  xl:w-[70px]  h-full object-contain  shadow-poker-card rounded"
              />
            </div>
          ))}
        </>
      ) : null}

      {turn ? (
        <div className="flop-card-4  ">
          <img
            src={stringToCardImg(turn)}
            alt="turn card"
            className="w-[30px] md:w-[40px]  xl:w-[70px] h-full object-contain shadow-poker-card rounded"
          />
        </div>
      ) : null}

      {river ? (
        <div className="flop-card-5   ">
          <img
            src={stringToCardImg(river)}
            alt="river card"
            className="w-[30px] md:w-[40px]  xl:w-[70px] h-full object-contain shadow-poker-card rounded"
          />
        </div>
      ) : null}
      {potentialStreetCards.length === 3 && (
        <PotentialCards cards={potentialStreetCards} setData={setData} />
      )}

      {potentialStreetCards?.length === 1 && turn === "" ? (
        <PotentialCards
          cards={potentialStreetCards}
          setData={setData}
          idx={3}
        />
      ) : null}
      {potentialStreetCards?.length === 1 && turn !== "" ? (
        <PotentialCards
          cards={potentialStreetCards}
          setData={setData}
          idx={4}
        />
      ) : null}
    </div>
  );
};

export default PokerTableCards;
