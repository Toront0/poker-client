import CardReveal from "../../components/Icons/CardReveal";
import CardRevealMd from "../../components/Icons/CardRevealMd";
import Rabbit from "../../components/Icons/Rabbit";
import { stringToCardImg } from "../../lib/functions/helpers";

interface IRabbitCard {
  idx: number;
  card: string;
  animate: boolean;
  isFlop: boolean;
}

const RabbitCard = ({ idx, card, animate, isFlop }: IRabbitCard) => {
  return (
    <div
      className={`${animate && isFlop ? "flop-card-" + (idx + 1) : ""} ${
        !isFlop ? "flop-card-" + (idx + 1) : ""
      } w-[30px] md:w-[40px]  xl:w-[70px] absolute h-full left-0 md:h-[56px] xl:h-auto`}
    >
      <div className="relative w-full h-full ">
        <div
          className={`absolute top-0 ${
            animate ? "test-6" : ""
          }   z-20  left-0 w-full h-full bg-gray-1 rounded flex items-center justify-center text-white text-5xl`}
        >
          <Rabbit animate={!animate} />
        </div>
        <div
          className={`absolute  ${
            animate ? "test-3" : ""
          } z-30 w-full md:bottom-0.5 left-0 h-full  rounded flex  text-white`}
        >
          <div
            className={`absolute hidden xl:block z-20 w-full top-0 left-0 h-full  rounded  text-white`}
          >
            <CardReveal animate={animate} />
          </div>
          <div
            className={`absolute z-20 w-full hidden md:block top-0 left-0  rounded  text-white`}
          >
            <CardRevealMd animate={animate} />
          </div>
        </div>
        <div className="w-full h-full flex   relative z-10 ">
          <img
            src={stringToCardImg(card)}
            alt=""
            className="w-[30px] md:w-[40px] xl:w-[70px] h-full object-contain shadow-poker-card rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default RabbitCard;
