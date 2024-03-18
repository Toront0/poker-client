import ModalPortal from "./ModalPortal";

import Button from "../Button";
import { formatMoney, formatTime } from "../../lib/utils";
import { useNavigate } from "react-router-dom";
import ModalContainer from "./ModalContainer";
import ModalHeader from "./ModalHeader";
import { FinalResults } from "../../shared/interfaces/pokerTable.interface";

interface IGameFinalResults extends FinalResults {
  onClose: () => void;
}

const GameFinalResults = ({
  onClose,
  amountOfPlayers,
  buyIn,
  createdAt,
  isPrivate,
  mode,
  name,
  players,
  prize
}: IGameFinalResults) => {
  const navigate = useNavigate();

  const formatWinners = () => {
    return players.sort((a, b) => a.place - b.place);
  };

  return (
    <ModalPortal onClose={onClose} container="table">
      <ModalContainer>
        <div className="">
          <ModalHeader onClose={onClose} title="ИГРА ЗАВЕРШЕНА" />
          <div className="p-4 flex flex-col justify-between">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-white">{name}</h3>
              <span className="text-xs text-gray-10">
                Игра была создана: {formatTime(createdAt)}
              </span>
            </div>

            <ul>
              {formatWinners().map((w) => (
                <li
                  key={w.id}
                  className="flex my-4 items-center justify-between w-full"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-16 h-16 rounded-full ${
                        w.place === 1
                          ? "gold"
                          : w.place === 2
                          ? "silver"
                          : w.place === 3
                          ? "bronze"
                          : ""
                      } p-[3px]`}
                    >
                      <div
                        className={`w-full ${
                          w.place <= 3 ? "bg-black" : ""
                        } h-full rounded-full`}
                      >
                        <img
                          src={w.profileImg}
                          alt={w.username}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>

                    <span className="text-base font-semibold text-white">
                      {w.username}
                    </span>
                  </div>{" "}
                  <div className="text-sm text-gray-12">
                    <span>{formatMoney(w.prize)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div>
              <span className="text-sm font-medium text-gray-10">
                ОБЩАЯ ИНФОРМАЦИЯ
              </span>
              <ul>
                <li className="flex items-center gap-2 text-gray-12 text-xs">
                  Приз:
                  <span>{formatMoney(prize)}</span>
                </li>
                <li className="flex items-center my-2 gap-2 text-gray-12 text-xs">
                  Бай-ин:
                  <span>{formatMoney(buyIn)}</span>
                </li>
                <li className="flex items-center gap-2 text-gray-12 text-xs">
                  Количество игроков:
                  <span>{amountOfPlayers}</span>
                </li>
                <li className="flex items-center my-2 gap-2 text-gray-12 text-xs">
                  Режим:
                  <span>{mode}</span>
                </li>
                {isPrivate && (
                  <li className="flex items-center gap-2 text-gray-12 text-xs">
                    Приватная комната
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="p-4">
          <Button onClick={() => navigate("/")}>Вернуться в лобби</Button>
        </div>
      </ModalContainer>
    </ModalPortal>
  );
};

export default GameFinalResults;
