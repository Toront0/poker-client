import { useContext } from "react";

import { SelectContext } from "../../../lib/context/select-context";
import { useOutsideClick } from "../../../lib/hooks/useOutsideClick";

const SelectCloseOutside = ({ children }: { children: React.ReactNode }) => {
  const { setIsOpen, currValue } = useContext(SelectContext);

  const ref = useOutsideClick(() => setIsOpen(false));

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="relative">
      {children}
    </div>
  );
};

export default SelectCloseOutside;
