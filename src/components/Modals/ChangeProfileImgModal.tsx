import { useEffect, useState } from "react";
import ModalPortal from "./ModalPortal";

import { FaCheck } from "react-icons/fa6";
import { useAuthState } from "../../store/store";
import Button from "../Button";

import ModalContainer from "./ModalContainer";
import ModalHeader from "./ModalHeader";

interface IChangeProfileImgModal {
  onClose: () => void;
}

type ProfileImg = {
  isFree: boolean;
  url: string;
};

const ChangeProfileImgModal = ({ onClose }: IChangeProfileImgModal) => {
  const [data, setData] = useState([] as ProfileImg[]);
  const authState = useAuthState();
  const [chosenImg, setChosenImg] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handler = async () => {
      const res = await fetch(
        `https://${import.meta.env.VITE_BACKEND_ORIGIN}/imgs`
      );

      const data = await res.json();

      setData(data);
    };

    handler();
  }, []);

  const checkForCurrImg = (v: string, i: number) => {
    if (!chosenImg) {
      if (v === authState.user.profileImg) return true;
    } else {
      if (i === chosenImg) return true;
    }
  };

  const handleUpdateProfileImg = async () => {
    if (chosenImg) {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:3000/change-img", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: authState.user.id,
            url: data[chosenImg].url
          })
        });

        if (res.status === 200) {
          onClose();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const setActiveImg = (isFree: boolean, url: string, i: number) => {
    if (!isFree) return;

    authState.setProfileImgLocally(url), setChosenImg(i);
  };

  return (
    <ModalPortal onClose={onClose}>
      <ModalContainer>
        <ModalHeader onClose={onClose} title="ИЗМЕНИТЬ ФОТО ПРОФИЛЯ" />
        <div className="p-4 overflow-y-auto h-full">
          <h2 className="text-xl font-bold text-white">Сменить фото профиля</h2>
          <p className="text-xs text-gray-8">
            Оформите VIP подписку и получите доступ к эксклюзивному контенту.
          </p>
          <div className="w-full mt-6 flex justify-center relative overflow-hidden">
            <div className="flex gap-4 flex-wrap gap-y-4">
              {data.map((v, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImg(v.isFree, v.url, i)}
                  className={`w-[77px] relative  p-0.5 h-[77px] ${
                    v.isFree && "silver cursor-pointer group"
                  } ${
                    authState.user.vipFinishedAt &&
                    !v.isFree &&
                    "gold cursor-pointer group"
                  }  rounded-full`}
                >
                  {checkForCurrImg(v.url, i) ? (
                    <div className="absolute top-1/2 z-20 bg-opac-b-8 rounded-full -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center w-full h-full text-2xl text-[#25ff30]">
                      <FaCheck />
                    </div>
                  ) : null}
                  <div className="w-full h-full relative bg-gray-2 overflow-hidden rounded-full">
                    {!v.isFree && !authState.user.vipFinishedAt && (
                      <div className="absolute  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-xs font-bold text-[#fbff22] bg-opac-b-8 rounded-full w-full h-full flex items-end justify-center">
                        VIP
                      </div>
                    )}
                    <img
                      src={v.url}
                      alt=""
                      className="w-full h-full group-hover:scale-110 transition-transform rounded-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <Button variant="secondary" onClick={onClose}>
              Отменить
            </Button>
            <Button onClick={handleUpdateProfileImg} isLoading={isLoading}>
              Подтвердить
            </Button>
          </div>
        </div>
      </ModalContainer>
    </ModalPortal>
  );
};

export default ChangeProfileImgModal;
