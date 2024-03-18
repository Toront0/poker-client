import { useContext } from "react";
import { SelectContext } from "../../../lib/context/select-context";

const SelectTrigger = ({ children }: { children: React.ReactNode }) => {
  const { setIsOpen, currValue } = useContext(SelectContext);

  return (
    <button
      type="button"
      onClick={() => setIsOpen((p) => !p)}
      className="text-sm text-gray-12 px-3 border border-opac-w-1 flex items-center justify-between min-w-[132px] w-full py-2 rounded bg-opac-w-1 cursor-pointer"
    >
      {!currValue ? children : currValue}
    </button>
  );
};

export default SelectTrigger;
