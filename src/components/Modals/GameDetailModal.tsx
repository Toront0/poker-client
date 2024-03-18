import { useState, ChangeEvent } from "react";

import ModalPortal from "./ModalPortal";
import CloseIcon from "../Icons/CloseIcon";

import Button from "../Button";
import { useAuthState } from "../../store/store";
import PasswordInput from "../UI/PasswordInput";
import ModalHeader from "./ModalHeader";
import ModalContainer from "./ModalContainer";
import CashModal from "./CashModal";

interface IGameDetailModal {
  onClose: () => void;
  gameId: number;
  playersInRoom: number[];
  isPrivate: boolean;
  amountOfPlayers: number;
  buyIn: number;
}

const GameDetailModal = ({
  onClose,
  gameId,
  playersInRoom,
  isPrivate,
  amountOfPlayers,
  buyIn
}: IGameDetailModal) => {
  const authState = useAuthState();
  const [joinResult, setJoinResult] = useState<"invalid-password" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [openCashModal, setOpenCashModal] = useState(false);

  const handleJoinRoom = async () => {
    if (playersInRoom?.includes(authState.user.id)) {
      return;
    }

    try {
      if (buyIn > authState.user.money) {
        setOpenCashModal(true);
        return;
      }

      setIsLoading(true);

      const res = await fetch("http://localhost:3000/join-game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          gameId: gameId,
          playerId: authState.user.id,
          password: password,
          playersInRoom: playersInRoom,
          amountOfPlayers: amountOfPlayers
        })
      });

      if (res.status === 409) {
        setJoinResult("invalid-password");
        return;
      }
      authState.addUserMoney(-buyIn);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (joinResult) {
      setJoinResult(null);
    }

    setPassword(e.target.value);
  };

  return (
    <ModalPortal onClose={onClose}>
      {openCashModal && <CashModal onClose={() => setOpenCashModal(false)} />}
      <ModalContainer>
        <ModalHeader onClose={onClose} title="SUNDAY MILLION" />
        <div className="w-full h-full bg-gradient-to-b p-4 flex overflow-y-auto flex-col from-purple-1 via-purple-2 to-purple-2">
          <ul className="h-full flex flex-col gap-2">
            <li className="flex items-center text-gray-12 text-sm gap-1">
              <span>1st - </span>
              <span className=" font-medium">5.000$</span>
            </li>
            <li className="flex items-center text-gray-12 text-sm gap-1">
              <span>2nd - </span>
              <span className=" font-medium">3.000$</span>
            </li>
            <li className="flex items-center text-gray-12 text-sm gap-1">
              <span>3rd - </span>
              <span className=" font-medium">1.000$</span>
            </li>
          </ul>
          {isPrivate && (
            <div className="my-4">
              <PasswordInput
                placeholder="Пароль от комнаты"
                value={password}
                id="roomPassword"
                name="roomPassword"
                onChange={onChange}
                error={!!joinResult}
                badgeType={joinResult ? "error" : undefined}
                badgeText={joinResult ? "Неверный пароль" : undefined}
              />
            </div>
          )}
          <div className="flex items-center justify-end gap-2 ">
            <div className="w-1/2">
              <Button onClick={onClose} variant="secondary">
                Закрыть
              </Button>
            </div>
            <div className="w-1/2">
              <Button
                disabled={playersInRoom?.includes(authState.user.id)}
                isLoading={isLoading}
                onClick={handleJoinRoom}
              >
                {playersInRoom?.includes(authState.user.id)
                  ? "Вы зарегистрированы"
                  : "Войти"}
              </Button>
            </div>
          </div>
        </div>
      </ModalContainer>
    </ModalPortal>
  );
};

export default GameDetailModal;
