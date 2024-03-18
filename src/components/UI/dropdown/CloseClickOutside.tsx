import { useContext } from "react";

import { DropdownContext } from "../../../lib/context/dropdown-context";
import { useOutsideClick } from "../../../lib/hooks/useOutsideClick";

const CloseClickOutside = ({ children }: { children: React.ReactNode }) => {
  const { setIsOpen } = useContext(DropdownContext);

  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative flex items-center"
    >
      {children}
    </div>
  );
};

export default CloseClickOutside;
