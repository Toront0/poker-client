import InteractButtons from "./InteractButtons";
import { useState, useRef, useEffect } from "react";
import TableInfo from "./TableInfo";

import { useAuthState, useGameState } from "../../store/store";
import LoadSpinner from "../../components/UI/LoadSpinner";

import { MdFullscreen } from "react-icons/md";

import table from "../../assets/table_main.png";

import { websocketReducer } from "../../lib/api/websocket-listener";
import ShowCards from "./ShowCards";

import PokerPlayers from "./PokerPlayers";
import PokerTableCards from "./PokerTableCards";
import PokerTablePot from "./PokerTablePot";

import GameFinalResults from "../../components/Modals/GameFinalResults";
import {
  FinalResults,
  ITable
} from "../../shared/interfaces/pokerTable.interface";
import LimitChangesModal from "./LimitChangesModal";

import { useParams } from "react-router-dom";

// const playersData = [
//   {
//     id: 1,
//     username: "333",
//     chips: 50000,
//     action: "",
//     status: "active",
//     img: table,
//     time_remains: 20,
//     time_bank: 20,
//     hand: ["1spades", "1clubs"],
//     bet: 0,
//     is_dealer: true,
//     emoji: 0,
//     nextAction: ""
//   },
//   {
//     id: 2,
//     username: "123",
//     chips: 50000,
//     action: "",
//     status: "waiting",
//     img: table,
//     time_remains: 20,
//     time_bank: 20,
//     hand: ["", ""],
//     bet: 0,
//     is_dealer: true,
//     emoji: 0,
//     nextAction: ""
//   },
//   {
//     id: 3,
//     username: "123",
//     chips: 50000,
//     action: "",
//     status: "waiting",
//     img: table,
//     time_remains: 20,
//     time_bank: 20,
//     hand: ["", ""],
//     bet: 0,
//     is_dealer: true,
//     emoji: 0,
//     nextAction: ""
//   },
//   {
//     id: 4,
//     username: "123",
//     chips: 50000,
//     action: "",
//     status: "waiting",
//     img: table,
//     time_remains: 20,
//     time_bank: 20,
//     hand: ["", ""],
//     bet: 0,
//     is_dealer: true,
//     emoji: 0,
//     nextAction: ""
//   },
//   {
//     id: 5,
//     username: "123",
//     chips: 50000,
//     action: "",
//     status: "waiting",
//     img: table,
//     time_remains: 20,
//     time_bank: 20,
//     hand: ["", ""],
//     bet: 0,
//     is_dealer: true,
//     emoji: 0,
//     nextAction: ""
//   },
//   {
//     id: 6,
//     username: "123",
//     chips: 50000,
//     action: "",
//     status: "waiting",
//     img: table,
//     time_remains: 20,
//     time_bank: 20,
//     hand: ["", ""],
//     bet: 0,
//     is_dealer: true,
//     emoji: 0,
//     nextAction: ""
//   },
//   {
//     id: 7,
//     username: "123",
//     chips: 50000,
//     action: "",
//     status: "waiting",
//     img: table,
//     time_remains: 20,
//     time_bank: 20,
//     hand: ["", ""],
//     bet: 0,
//     is_dealer: true,
//     emoji: 0,
//     nextAction: ""
//   },
//   {
//     id: 8,
//     username: "123",
//     chips: 50000,
//     action: "",
//     status: "waiting",
//     img: table,
//     time_remains: 20,
//     time_bank: 20,
//     hand: ["", ""],
//     bet: 0,
//     is_dealer: true,
//     emoji: 0,
//     nextAction: ""
//   }
// ];

const PokerTable = () => {
  const { id } = useParams();

  const initWSConn = useGameState((s) => s.initWSConn);
  const [data, setData] = useState({} as ITable);
  const wsRef = useRef<WebSocket>();
  const authState = useAuthState();
  const fullElRef = useRef<HTMLDivElement>();
  const [showAnim, setShowAnim] = useState(false);
  const [playerLose, setPlayerLose] = useState<number[]>([]);
  const [finalResults, setFinalResults] = useState({} as FinalResults);
  const [isLoading, setIsLoading] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);

  const playerRef = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef()
  ];

  const authUser = data.players?.find((v) => v.id === authState.user.id);

  useEffect(() => {
    if (!wsRef.current && !authState.isLoading) {
      const ws = new WebSocket(
        `wss://${import.meta.env.VITE_BACKEND_ORIGIN}/ws/poker/table/${id}/${
          authState.user.id || 0
        }`
      );

      wsRef.current = ws;

      initWSConn(ws);
      ws.onopen = () => {
        console.log("WS connection esatblished");
      };

      ws.onmessage = (msg) => {
        const parsed = JSON.parse(msg.data);

        console.log("from server: ", parsed);

        websocketReducer(
          parsed,
          setData,
          setShowAnim,
          setPlayerLose,
          setShowLimitModal,
          authUser
        );
      };
    }
  }, [authState.isLoading]);

  useEffect(() => {
    if (!authState.isLoading) {
      const handler = async () => {
        try {
          setIsLoading(true);

          const res = await fetch(
            `https://${import.meta.env.VITE_BACKEND_ORIGIN}/poker/table/${id}/${
              authState.user.id || 0
            }`
          );

          if (res.status === 404) {
            const res = await fetch(
              `https://${
                import.meta.env.VITE_BACKEND_ORIGIN
              }/game-results/${id}`
            );

            const data = await res.json();

            setFinalResults(data);

            return;
          }

          const data = await res.json();

          setData(() => {
            return {
              id: data.id,
              created_at: data.created_at,
              ante: data.ante,
              flop: data.flop,
              min_bet: data.min_bet,
              name: data.name,
              players: data.players,
              pot: data.pot,
              potentialStreetCards: [],
              river: data.river,
              turn: data.turn,
              winner: data.winner,
              isAllInStage: data.isAllInStage,
              prize: data.prize,
              amountOfPlayers: data.amountOfPlayers
            };
          });
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      handler();
    }
  }, [authState.isLoading]);

  const enterFullScreen = () => {
    fullElRef.current?.requestFullscreen();
  };

  console.log("data", data);

  return (
    // Had to specify id for this div, because afterwards we need to render modal with portal but in mobile fullscreen mode those modal won't render cuz the modal should be inside of a div we are gonna fullscreen *as far as i understand.
    <div
      id="table"
      ref={fullElRef as React.RefObject<HTMLDivElement>}
      className="flex w-full h-full select-none relative bg-gray-1 items-center justify-center"
    >
      {showLimitModal && (
        <LimitChangesModal setShowLimitModal={setShowLimitModal} />
      )}

      {/* <PlayerResultGameModal winners={data.winner} playerLose={playerLose} /> */}

      {isLoading ? (
        <LoadSpinner />
      ) : finalResults.id ? (
        <GameFinalResults
          onClose={() => console.log(312)}
          id={finalResults.id}
          amountOfPlayers={finalResults.amountOfPlayers}
          buyIn={finalResults.buyIn}
          createdAt={finalResults.createdAt}
          isPrivate={finalResults.isPrivate}
          mode={finalResults.mode}
          name={finalResults.name}
          players={finalResults.players}
          prize={finalResults.prize}
          prizeDestribution={finalResults.prizeDestribution}
        />
      ) : data.id ? (
        <>
          {authUser && data.winner.length === 0 && !data.isAllInStage && (
            <InteractButtons
              gameID={data.id}
              players={data.players}
              pot={data.pot}
              wsConn={wsRef.current}
              winners={data.winner}
              min_bet={data.min_bet}
              nextAction={
                data.players.find((v) => v.id === authState.user.id)?.nextAction
              }
            />
          )}
          {authUser && data.winner.length > 0 && (
            <ShowCards
              hand={data.players.find((v) => v.id === authState.user.id)!.hand}
              authUser={data.players.find((v) => v.id === authState.user.id)!}
            />
          )}

          <TableInfo ante={data.ante} min_bet={data.min_bet} name={data.name} />
          <button
            className="absolute text-gray-12 text-2xl top-4 right-4"
            onClick={enterFullScreen}
          >
            <MdFullscreen />
          </button>
          <div className="flex items-center justify-center ">
            <div className="w-[70%] rounded-full   h-[70%] relative ">
              <div className="drop-shadow-table-light-md  xl:drop-shadow-table-light-xl">
                <img
                  src={table}
                  alt=""
                  className="w-full drop-shadow-table-shadow-xl h-full object-contain relative z-10"
                />
              </div>
              <PokerPlayers
                flop={data.flop}
                isAllInStage={data.isAllInStage}
                players={data.players}
                playersRef={playerRef}
                showAnim={showAnim}
                winner={data.winner}
                wsRef={wsRef.current}
                amountOfPlayers={data.amountOfPlayers}
                playerLose={playerLose}
              />

              <div className="absolute top-1/2 flex flex-col z-20 gap-1 xl:gap-3 items-center justify-center -translate-y-1/2 left-1/2 -translate-x-1/2 w-full  h-full rounded-full">
                <PokerTablePot pot={data.pot} />
                <PokerTableCards
                  flop={data.flop}
                  potentialStreetCards={data.potentialStreetCards}
                  river={data.river}
                  turn={data.turn}
                  setData={setData}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-white">Game NOT FOUND</div>
      )}
    </div>
  );
};

export default PokerTable;
