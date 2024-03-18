import { createContext, useState, Dispatch, SetStateAction } from "react";

type SelectContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  currValue: any;
  setCurrValue: Dispatch<SetStateAction<any>>;
  chosenOption: number;
  setChosenOption: Dispatch<SetStateAction<number>>;
};

export const SelectContext = createContext({} as SelectContextType);

export default function SelectProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currValue, setCurrValue] = useState("");
  const [chosenOption, setChosenOption] = useState(0);

  return (
    <SelectContext.Provider
      value={{
        isOpen,
        setIsOpen,
        currValue,
        setCurrValue,
        chosenOption,
        setChosenOption
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}
