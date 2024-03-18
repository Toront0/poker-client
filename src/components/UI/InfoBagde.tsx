import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useOutsideClick } from "../../lib/hooks/useOutsideClick";

interface IInfoBagde {
  children: React.ReactNode;
  position?: "top" | "top-right";
}

const InfoBagde = ({ children, position = "top" }: IInfoBagde) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const ref = useOutsideClick(() => setIsExpanded(false));

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="relative">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="text-sm text-gray-10"
      >
        <FaInfoCircle />
      </button>
      {isExpanded && (
        <div
          className={`text-xs text-gray-12 p-2 bg-gray-2 rounded absolute ${
            position === "top"
              ? "left-1/2 shadow-xl -translate-x-1/2"
              : "left-full"
          } bottom-full mb-1 z-30 w-64`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default InfoBagde;
