import { stillVip } from "../../../lib/utils";
import { useAuthState } from "../../../store/store";
import {
  Dropdown,
  DropdownContent,
  DropdownToggle
} from "../../UI/dropdown/Dropdown";
import UserDropdownContent from "./UserDropdownContent";

const UserProfileDropdown = () => {
  const authState = useAuthState((state) => state.user);

  return (
    <Dropdown>
      <DropdownToggle>
        <div className="w-9   pointer-events-none h-9 cursor-pointer rounded-full bg-gray-4">
          <img
            src={authState.profileImg}
            alt={authState.username}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </DropdownToggle>
      <DropdownContent>
        <div className="flex items-center gap-2">
          <div
            className={`w-12 h-12 ${
              stillVip(authState.vipFinishedAt) ? "gold" : ""
            } rounded-full p-0.5`}
          >
            <div className="bg-black rounded-full">
              <img
                src={authState.profileImg}
                alt={authState.username}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <span className=" text-white font-semibold">
            {authState.username}
          </span>
        </div>
        <UserDropdownContent />
      </DropdownContent>
    </Dropdown>
  );
};

export default UserProfileDropdown;
