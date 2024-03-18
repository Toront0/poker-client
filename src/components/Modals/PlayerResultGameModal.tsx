import React, { useState, useEffect } from "react";
import ModalPortal from "./ModalPortal";
import CloseIcon from "../Icons/CloseIcon";
import { useAuthState } from "../../store/store";
import ModalContainer from "./ModalContainer";
import ModalHeader from "./ModalHeader";

interface IPlayerResultGameModal {
  winners: number[];
  playerLose: number[];
}

const PlayerResultGameModal = ({
  winners,
  playerLose
}: IPlayerResultGameModal) => {
  const [openModal, setOpenModal] = useState(false);

  const authState = useAuthState((s) => s.user);

  useEffect(() => {
    if (playerLose.includes(authState.id)) {
      setOpenModal(true);
    }
  }, [winners]);

  return (
    <>
      {openModal && (
        <ModalPortal onClose={() => setOpenModal(false)}>
          <ModalContainer>
            <ModalHeader
              onClose={() => setOpenModal(false)}
              title="SUNDAY MILLION"
            />
            <div className="mt-4 flex flex-col items-center gap-4">
              <h3 className="text-center text-gray-9 font-medium">
                Вы заняли 3-е место
              </h3>
              <div className="w-28 h-28 rounded-full silver p-1">
                <div className="w-full h-full rounded-full bg-black">
                  <img
                    src={authState.profileImg}
                    alt=""
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
              </div>
              <h4 className="text-lg font-bold text-white">
                {authState.username}
              </h4>
              <div>
                <h4 className="text-xl text-gray-12 font-bold text-center">
                  Total PRIZE:
                </h4>
                <h5 className="text-4xl font-extrabold  text-transparent bg-gradient-to-b from-[#FEDB37] via-[#FDB931] to-[#8A6E2F] bg-clip-text">
                  $17.500
                </h5>
              </div>
            </div>
          </ModalContainer>
        </ModalPortal>
      )}
    </>
  );
};

export default PlayerResultGameModal;
