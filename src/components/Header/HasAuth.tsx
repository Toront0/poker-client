import { useState } from "react";

import UserProfileDropdown from "./UserDropdown/UserProfileDropdown";
import CashModal from "../Modals/CashModal";
import { useAuthState } from "../../store/store";
import { formatMoney } from "../../lib/utils";

const HasAuth = () => {
  const authState = useAuthState((s) => s.user);
  const [openCashModal, setOpenCashModal] = useState(false);

  return (
    <div className="flex gap-2  items-center">
      {openCashModal && <CashModal onClose={() => setOpenCashModal(false)} />}
      <button
        onClick={() => setOpenCashModal((p) => !p)}
        className="h-8 w-40 rounded-full bg-opac-w-2 flex justify-between items-center gap-2"
      >
        <div className="flex gap-2 items-center">
          <span className="pl-4 text-gray-12 text-sm font-semibold">
            {formatMoney(authState.money)}
          </span>
        </div>
      </button>

      <UserProfileDropdown />
    </div>
  );
};

export default HasAuth;
