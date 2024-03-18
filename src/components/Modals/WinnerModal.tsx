import ModalPortal from "./ModalPortal";

import { IoMdClose } from "react-icons/io";
import { TbArrowBackUp } from "react-icons/tb";

import img from "../../assets/bg.webp";

interface IWinnerModal {
  onClose: () => void;
}

const WinnerModal = ({ onClose }: IWinnerModal) => {
  return (
    <ModalPortal onClose={onClose}>
      <div className="w-[500px] rounded relative bg-gray-2 p-4">
        <button className="text-2xl text-gray-12 absolute top-0 -right-8">
          <IoMdClose />
        </button>
        <h3 className="text-xl text-white text-center font-semibold">
          Игра завершена
        </h3>
        <div className="flex justify-around items-center mt-6">
          <div className="flex flex-col gap-2 items-center">
            <div className="w-20 h-20 rounded-full p-[3px] silver">
              <div className="w-full h-full rounded-full bg-gray-2">
                <img
                  src={img}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-12">Admin</span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-24 h-24 rounded-full p-[3px] gold">
              <div className="w-full h-full rounded-full bg-gray-2">
                <img
                  src={img}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-12">Saliba22</span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-20 h-20 rounded-full p-[3px] silver">
              <div className="w-full h-full rounded-full bg-gray-2">
                <img
                  src={img}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-12">Antoniio</span>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="text-sm text-gray-8 font-semibold">УЧАСТНИКИ</h4>

          <ul>
            <li className="flex items-center justify-between px-2 py-1">
              <div className="flex items-center gap-3">
                <span className="text-sm w-3  font-semibold text-white">1</span>
                <img
                  src={img}
                  alt=""
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-sm text-gray-12  font-medium rounded">
                  Saliba22
                </span>
              </div>
              <span className="text-xs text-gray-9">$472.90</span>
            </li>
            <li className="flex items-center justify-between px-2 py-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-white w-3">2</span>
                <img
                  src={img}
                  alt=""
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-sm text-gray-12  font-medium rounded">
                  admin
                </span>
              </div>
              <span className="text-xs text-gray-9">$411.22</span>
            </li>
            <li className="flex items-center justify-between px-2 py-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-white w-3">3</span>
                <img
                  src={img}
                  alt=""
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-sm text-gray-12  font-medium rounded">
                  Admin
                </span>
              </div>
              <span className="text-xs text-gray-9">$355</span>
            </li>
            <li className="flex items-center justify-between px-2 py-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-white w-3">4</span>
                <img
                  src={img}
                  alt=""
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-sm text-gray-12  font-medium rounded">
                  Admin
                </span>
              </div>
              <span className="text-xs text-gray-9">$176</span>
            </li>
            <li className="flex items-center justify-between px-2 py-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-white w-3">5</span>
                <img
                  src={img}
                  alt=""
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-sm text-gray-12  font-medium rounded">
                  Admin
                </span>
              </div>
              <span className="text-xs text-gray-9">$122</span>
            </li>
            <li className="flex items-center justify-between px-2 py-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-white w-3">6</span>
                <img
                  src={img}
                  alt=""
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-sm text-gray-12  font-medium rounded">
                  Admin
                </span>
              </div>
              <span className="text-xs text-gray-9">$95</span>
            </li>
            <li className="flex items-center justify-between px-2 py-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-white w-3">7</span>
                <img
                  src={img}
                  alt=""
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-sm text-gray-12  font-medium rounded">
                  Admin
                </span>
              </div>
            </li>
            <li className="flex items-center justify-between px-2 py-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-white w-3">8</span>
                <img
                  src={img}
                  alt=""
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-sm text-gray-12  font-medium rounded">
                  Admin
                </span>
              </div>
            </li>
          </ul>
          <button className="text-sm w-full py-1 text-white flex items-center justify-center gap-1 bg-purple-7 hover:bg-purple-8 rounded font-medium mt-4">
            В главное меню
            <TbArrowBackUp className="text-xl" />
          </button>
        </div>
      </div>
    </ModalPortal>
  );
};

export default WinnerModal;
