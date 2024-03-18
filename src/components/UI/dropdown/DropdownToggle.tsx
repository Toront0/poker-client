import { useContext } from "react";
import { DropdownContext } from "../../../lib/context/dropdown-context";

const DropdownToggle = ({ children }: { children: React.ReactNode }) => {
  const { setIsOpen } = useContext(DropdownContext);

  return (
    <button
      data-ignore-outside-clicks
      onClick={() => setIsOpen((p) => !p)}
      className=" select-none"
    >
      {children}
    </button>
  );
};

export default DropdownToggle;
