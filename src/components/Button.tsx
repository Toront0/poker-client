import { ButtonHTMLAttributes } from "react";
import ButtonLoading from "./ButtonLoading";
import { cn } from "../lib/utils";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  isLoading,
  ...rest
}: IButton) => {
  return (
    <button
      {...rest}
      className={cn(
        "w-full",

        "h-10 bg-blue-5 disabled:cursor-not-allowed disabled:brightness-50 disabled:bg-blue-1 p-0.5 relative rounded-sm",
        rest.className
      )}
    >
      <div
        className={`absolute text-sm top-1/2 w-full  left-1/2 z-20 -translate-y-1/2 -translate-x-1/2 ${
          variant === "primary" ? "text-white" : "text-gray-12"
        }`}
      >
        {children}
      </div>
      <div
        className={`w-full h-full  bg-gradient-to-t ${
          variant === "primary"
            ? "from-blue-6 via-blue-6 to-blue-10"
            : "from-blue-3 via-blue-3 to-blue-7"
        }  rounded-sm  relative  p-px`}
      >
        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-r ${
            variant === "primary"
              ? "from-blue-5 via-blue-10 to-blue-5"
              : "from-blue-3 via-blue-7 to-blue-3"
          } w-1/2 h-1/2`}
        ></div>
        <div
          className={`w-full h-full overflow-hidden ${
            variant === "primary" ? "bg-blue-6" : "bg-blue-4"
          } relative  rounded-sm  `}
        >
          {isLoading && <ButtonLoading />}
          <div className="w-full h-1/2 "></div>
          <div
            className={`w-full h-1/2 ${
              variant === "primary" ? "bg-blue-5" : "bg-blue-3"
            }`}
          ></div>
        </div>
      </div>
    </button>
  );
};

export default Button;
