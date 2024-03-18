import { useContext } from "react";
import { DropdownContext } from "../../../lib/context/dropdown-context";

interface IDropdownContent {
  children: React.ReactNode;
  onClose?: () => void;
}

const DropdownContent = ({ children }: IDropdownContent) => {
  const { isOpen } = useContext(DropdownContext);

  return (
    <>
      {isOpen && (
        <div className="absolute shadow-elev-2  bg-gradient-to-br from-blue-1 via-blue-2 to-blue-2 w-64 md:w-[350px] rounded top-full z-30 right-0 border border-blue-4 p-3">
          {children}
        </div>
      )}
    </>
  );
};

export default DropdownContent;
