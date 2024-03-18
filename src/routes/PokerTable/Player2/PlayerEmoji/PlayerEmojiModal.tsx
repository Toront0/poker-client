import ModalPortal from "../../../../components/Modals/ModalPortal";

import { emojiesList } from "../../../../lib/constants";
import { useAuthState } from "../../../../store/store";

interface IPlayerEmojiModal {
  onClose: () => void;
  wsRef?: WebSocket;
}

const PlayerEmojiModal = ({ onClose, wsRef }: IPlayerEmojiModal) => {
  const authState = useAuthState((s) => s.user);

  const handleSendMessage = (id: number) => {
    wsRef?.send(
      JSON.stringify({
        action: "emoji",
        data: {
          emojiId: id,
          senderId: authState.id
        }
      })
    );

    onClose();
  };

  return (
    <ModalPortal onClose={onClose} container="table">
      <div className="w-full h-full relative flex items-start">
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className="w-1/2 md:w-1/3 py-4 xl:w-1/4 h-full   bg-opac-w-1 overflow-y-auto "
        >
          <div className="flex flex-wrap">
            {emojiesList.map((v) => (
              <button
                onClick={() => handleSendMessage(v.id)}
                key={v.id}
                className="w-1/4 xl:brightness-75 xl:hover:brightness-100 xl:cursor-pointer aspect-square"
              >
                <img src={v.img} alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default PlayerEmojiModal;
