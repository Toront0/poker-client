import { Dispatch, SetStateAction, useEffect } from "react";

import { FaInfo } from "react-icons/fa";

interface ILimitChangesModal {
  setShowLimitModal: Dispatch<SetStateAction<boolean>>;
}

const LimitChangesModal = ({ setShowLimitModal }: ILimitChangesModal) => {
  useEffect(() => {
    const id = setTimeout(() => {
      setShowLimitModal(false);
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, [setShowLimitModal]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full h-full z-50">
      <div className="px-4 flex gap-2 py-4 text-gray-10 rounded bg-opac-b-8">
        <FaInfo />
        <h4 className="text-sm  font-semibold">
          В следующем раунде лимиты будут повышены!
        </h4>
      </div>
    </div>
  );
};

export default LimitChangesModal;
