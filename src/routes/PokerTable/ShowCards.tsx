import { stringToCardImg } from "../../lib/functions/helpers";
import { useGameState } from "../../store/store";
import { PlayerType } from "../../shared/interfaces/pokerTable.interface";

interface IShowCards {
  hand: string[];
  authUser: PlayerType;
}

const ShowCards = ({ hand, authUser }: IShowCards) => {
  const gameState = useGameState();

  console.log("gameState.showedCards", gameState.showedCards);

  return (
    <div className="absolute bottom-2 right-2 flex gap-2">
      {!gameState.showedCards.includes(hand![0]) && (
        <button
          onClick={() => gameState.showCard(hand![0], "first", authUser?.id)}
          className="px-2 py-1 rounded bg-gradient-to-r bg-black  text-white text-xs xl:text-sm border border-opac-w-2  flex items-center gap-2"
        >
          <img src={stringToCardImg(hand![0])} alt="" className="w-6" />
          Показать
        </button>
      )}
      {!gameState.showedCards.includes(hand![1]) && (
        <button
          onClick={() => gameState.showCard(hand![1], "second", authUser?.id)}
          className="px-2 py-1 rounded bg-gradient-to-r bg-black  text-white text-xs xl:text-sm border border-opac-w-2  flex items-center gap-2"
        >
          <img src={stringToCardImg(hand![1])} alt="" className="w-6" />
          Показать
        </button>
      )}

      {!gameState.showedCards.includes(hand[0]) &&
        !gameState.showedCards.includes(hand[1]) && (
          <button
            onClick={() => gameState.showBothCard(hand, authUser.id)}
            className="px-2 py-1 rounded bg-gradient-to-r from-blue-7 via-blue-5 to-blue-5 text-white text-xs xl:text-sm border border-opac-w-1  flex items-center gap-2"
          >
            Показать оба
          </button>
        )}
    </div>
  );
};

export default ShowCards;
