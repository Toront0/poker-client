import { useState } from "react";
import DropdownLinkItem from "../../UI/dropdown/DropdownLinkItem";
import DropdownButtonItem from "../../UI/dropdown/DropdownButtonItem";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GiTabletopPlayers } from "react-icons/gi";
import { FaUser } from "react-icons/fa6";
import UserGamesPreview from "./UserGamesPreview";
import { useAuthState } from "../../../store/store";

const UserDropdownContent = () => {
  const authState = useAuthState();
  const [currState, setCurrState] = useState<"general" | "my-games">("general");

  return (
    <>
      {currState === "general" ? (
        <div className="mt-3">
          <DropdownLinkItem href={`/${authState.user.id}`}>
            <div className="flex items-center gap-2 text-gray-12">
              <FaUser />
              <span className="text-sm font-medium">Профиль</span>
            </div>
          </DropdownLinkItem>
          <DropdownButtonItem onClick={() => setCurrState("my-games")}>
            <div className="flex items-center gap-2 text-gray-12">
              <GiTabletopPlayers className="text-base" />
              Мои игры
            </div>
          </DropdownButtonItem>
          <DropdownButtonItem onClick={() => authState.logout()}>
            <div className="flex items-center gap-2 text-gray-12">
              <RiLogoutBoxRLine className="text-base" />
              Выйти
            </div>
          </DropdownButtonItem>
        </div>
      ) : (
        <UserGamesPreview onBack={() => setCurrState("general")} />
      )}
    </>
  );
};

export default UserDropdownContent;
