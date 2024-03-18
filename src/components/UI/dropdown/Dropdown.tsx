import DropdownProvider from "../../../lib/context/dropdown-context";
import CloseClickOutside from "./CloseClickOutside";
import DropdownButtonItem from "./DropdownButtonItem";
import DropdownContent from "./DropdownContent";
import DropdownLinkItem from "./DropdownLinkItem";
import DropdownToggle from "./DropdownToggle";

const Dropdown = ({ children }: { children: React.ReactNode }) => {
  return (
    <DropdownProvider>
      <CloseClickOutside>{children}</CloseClickOutside>
    </DropdownProvider>
  );
};

export {
  Dropdown,
  DropdownButtonItem,
  DropdownContent,
  DropdownLinkItem,
  DropdownToggle
};
