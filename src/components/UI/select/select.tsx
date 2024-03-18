import SelectProvider from "../../../lib/context/select-context";
import SelectCloseOutside from "./SelectCloseOutside";

const SelectCustom = ({ children }: { children: React.ReactNode }) => {
  return (
    <SelectProvider>
      <SelectCloseOutside>{children}</SelectCloseOutside>
    </SelectProvider>
  );
};

export default SelectCustom;
