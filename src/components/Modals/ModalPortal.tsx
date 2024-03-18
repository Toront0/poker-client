import { useMemo } from "react";
import { createPortal } from "react-dom";

interface IModalPortal {
  children: React.ReactNode;
  container?: string;
  onClose: () => void;
}

const ModalPortal = ({
  children,
  container = "modals",
  onClose
}: IModalPortal) => {
  const modalPlace = useMemo(
    () => document.getElementById(container),
    []
  ) as HTMLElement;

  return createPortal(
    <div
      onMouseDown={onClose}
      className="fixed top-0 left-0 z-50 w-full m-0 h-full flex items-center justify-center bg-black bg-opacity-80"
    >
      {children}
    </div>,
    modalPlace
  );
};

export default ModalPortal;
