import { useState, SyntheticEvent } from "react";

import { FaCheck } from "react-icons/fa6";
import Button from "../../components/Button";
import { useAuthState } from "../../store/store";
import CashModal from "../../components/Modals/CashModal";

interface ISubscribeOption {
  option: string;
  subscribeDate: "month" | "6 month" | "year";
  price: number;
  options: string[];
  isPremium?: boolean;
}

const SubscribeOption = ({
  option,
  subscribeDate,
  price,
  options,
  isPremium
}: ISubscribeOption) => {
  const authState = useAuthState();
  const [openCashModal, setOpenCashModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (authState.user.money < price) {
      setOpenCashModal(true);
      return;
    }

    if (!authState.user.id) {
      return;
    }

    try {
      setIsLoading(true);
      //   await fetch(`https://${import.meta.env.VITE_BACKEND_ORIGIN}/subscribe`, {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       userId: authState.id,
      //       subscribeDate: subscribeDate
      //     })
      //   });
      await fetch(`http://localhost:3000/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: authState.user.id,
          subscribeDate: subscribeDate
        })
      });

      authState.setUser((p) => ({
        ...p,
        vipFinishedAt: new Date(
          new Date().setMonth(
            subscribeDate === "6 month" ? 6 : subscribeDate === "month" ? 1 : 12
          )
        )
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("authState.user", authState.user);

  return (
    <form onSubmit={handleSubscribe} className="w-full p-1 bg-purple-1 rounded">
      {openCashModal && <CashModal onClose={() => setOpenCashModal(false)} />}
      <div
        className={`w-full h-full p-px bg-gradient-to-tl rounded-sm ${
          isPremium
            ? " from-purple-2 via-purple-6 to-purple-6"
            : "from-purple-2 via-purple-3 to-purple-5"
        }`}
      >
        <div
          className={`w-full  p-4 flex flex-col items-center ${
            isPremium
              ? "from-purple-4 via-purple-3 to-purple-2"
              : " from-purple-3 via-purple-2 to-purple-1 "
          } bg-gradient-to-br `}
        >
          <div className="px-4 text-sm  py-1 border-2 border-opac-w-1 rounded-full font-medium text-gray-10">
            {option}
          </div>
          <div className="flex items-baseline ">
            <h3 className="text-3xl md:text-4xl font-bold my-4 text-white">
              ${price}
            </h3>
            <span className="text-xs text-gray-10">/{subscribeDate}</span>
          </div>
          <div className="mt-4 py-4 w-full flex justify-center border-t border-opac-w-1">
            <ul>
              {options.map((v, i) => (
                <li key={i} className="flex mb-6 items-center text-white gap-2">
                  <FaCheck className="w-6" />
                  <span className="text-sm">{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button
            type="submit"
            className="mt-6"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Оформить
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SubscribeOption;
