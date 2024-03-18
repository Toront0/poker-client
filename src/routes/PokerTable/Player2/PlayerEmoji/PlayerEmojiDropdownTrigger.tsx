import { useState } from "react";

import emoji from "../../../../assets/main_emoji.png";
import PlayerEmojiModal from "./PlayerEmojiModal";

interface IPlayerEmojiDropdownTrigger {
  wsRef?: WebSocket;
}

const PlayerEmojiDropdownTrigger = ({ wsRef }: IPlayerEmojiDropdownTrigger) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="absolute left-full ml-2 bottom-0 ">
      {openModal && (
        <PlayerEmojiModal onClose={() => setOpenModal(false)} wsRef={wsRef} />
      )}
      <button
        onClick={() => setOpenModal((p) => !p)}
        className="w-5 xl:w-8 cursor-pointer  h-5 xl:h-8"
      >
        <img src={emoji} alt="" className=" object-contain" />
      </button>
    </div>
  );
};

export default PlayerEmojiDropdownTrigger;
