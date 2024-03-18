import { LuPlus } from "react-icons/lu";
import {
  findPlayerPosition,
  parsePositionToTailwindClass
} from "../lib/functions/helpers";

interface IEmptySeat {
  idx: number;
  amountOfPlayers: number;
}

const EmptySeat = ({ idx, amountOfPlayers }: IEmptySeat) => {
  return (
    <div
      className={`flex items-center z-20 justify-center w-16 absolute  ${parsePositionToTailwindClass(
        findPlayerPosition(amountOfPlayers, idx)
      )}  text-4xl h-16 rounded-full text-gray-12 bg-opac-b-8 border border-opac-w-1`}
    >
      <LuPlus />
    </div>
  );
};

export default EmptySeat;
