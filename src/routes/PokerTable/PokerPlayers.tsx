import Player from "./Player2/Player";
import { findPlayerPosition, formatPlayers } from "../../lib/functions/helpers";
import { useAuthState } from "../../store/store";
import { MutableRefObject } from "react";
import { PlayerType } from "../../shared/interfaces/pokerTable.interface";

interface IPokerPlayers {
  players: PlayerType[];
  winner: number[];
  flop: string[];
  isAllInStage: boolean;
  wsRef?: WebSocket;
  showAnim: boolean;
  playersRef: MutableRefObject<HTMLDivElement | undefined>[];
  amountOfPlayers: number;
  playerLose: number[];
}

const PokerPlayers = ({
  players,
  winner,
  wsRef,
  flop,
  isAllInStage,
  playersRef,
  showAnim,
  amountOfPlayers,
  playerLose
}: IPokerPlayers) => {
  const authState = useAuthState((s) => s.user);

  return (
    <div className="w-full h-full z-20  rounded-full  absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <div className="relative w-full h-full ">
        {formatPlayers(players, authState.id).map((p, i) => (
          <Player
            key={i}
            id={p.id}
            username={p.username}
            chips={p.chips}
            action={p.action}
            time_bank={p.time_bank}
            time_remains={p.time_remains}
            status={p.status}
            img={p.img}
            hand={p.hand}
            bet={p.bet}
            is_dealer={p.is_dealer}
            playerIdx={i}
            amountOfPlayers={amountOfPlayers}
            winner={winner}
            flip={i > 0 && i < 4}
            showAnim={winner.length === 0 && showAnim}
            ref={playersRef[i]}
            authUser={p.id === authState.id}
            emoji={p.emoji}
            nextAction={p.nextAction}
            flop={flop}
            wsRef={wsRef}
            isAllInStage={isAllInStage}
            beingKicked={playerLose.includes(p.id)}
            playerPosition={findPlayerPosition(amountOfPlayers, i)}
          />
        ))}
      </div>
    </div>
  );
};

export default PokerPlayers;
