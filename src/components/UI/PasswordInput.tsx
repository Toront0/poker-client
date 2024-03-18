import { useState } from "react";

import { IoEye, IoEyeOff } from "react-icons/io5";

interface IPasswordInput extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  badgeType?: "error" | "info";
  badgeText?: string;
}

const PasswordInput = ({
  error,
  badgeType,
  badgeText,
  ...rest
}: IPasswordInput) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`transition-colors rounded relative flex border-opac-w-1 ${
        isFocused
          ? "border-purple-8 bg-black shadow-[0_0px_5px_rgba(119,44,232,1)]"
          : "bg-opac-w-1"
      }  border  w-full h-9 ${
        error ? "border-[#ff0000] shadow-[0_0px_5px_rgba(255,0,0,1)]" : ""
      }`}
    >
      {badgeText && (
        <div
          className={`absolute text-sm rounded ${
            badgeType === "error" ? "bg-[#ac1212]" : ""
          } text-white bottom-full mb-4 left-1/2 -translate-x-1/2 py-2 px-6`}
        >
          <div
            className={`w-0  absolute top-full left-1/2 -translate-x-1/2 h-0 
   border-l-[6px] border-l-transparent
   border-t-[6px] ${badgeType === "error" ? "border-t-[#ac1212]" : ""}
   border-r-[6px] border-r-transparent
    `}
          ></div>
          {badgeText}
        </div>
      )}
      <input
        {...rest}
        autoComplete="off"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type={isPasswordVisible ? "text" : "password"}
        className={`focus:outline-none peer w-full h-full bg-transparent px-2 text-sm text-white  disabled:placeholder:text-gray-7 `}
      />
      <button
        onClick={() => setIsPasswordVisible((p) => !p)}
        className="h-full px-2 flex items-center justify-center text-xl text-gray-12"
      >
        {isPasswordVisible ? <IoEyeOff /> : <IoEye />}
      </button>
    </div>
  );
};

export default PasswordInput;
