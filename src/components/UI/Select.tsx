import { useState, useEffect } from "react";
import { clamp } from "../../lib/utils";
import { useOutsideClick } from "../../lib/hooks/useOutsideClick";

type Option = {
  title: string;
  value: any;
  disable?: boolean;
};

interface ISelect {
  options: Option[];
  onChange: (n: string, v: any) => void;
  name: string;
}

const Select = ({ options, onChange, name }: ISelect) => {
  const [chosenOption, setChosenOption] = useState(0);
  const [expandOptions, setExpandOptions] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<"bottom" | "top">("bottom");

  const selectRef = useOutsideClick(() => setExpandOptions(false));

  useEffect(() => {
    if (options[chosenOption].disable) {
      setChosenOption(options.findIndex((v) => !v.disable));
    }

    const handler = (e: any) => {
      if (e.target !== selectRef.current) {
        return;
      }

      switch (e.key) {
        case "Tab":
          setExpandOptions((prev) => !prev);
          break;
        case "Enter":
        case " ":
          setExpandOptions((prev) => !prev);

          break;
        case "ArrowUp":
        case "ArrowDown":
          const newV = e.key === "ArrowUp" ? -1 : 1;
          setChosenOption((prev) => clamp(0, options.length - 1, prev + newV));
          onChange(name, options[chosenOption + newV].value);
      }
    };

    selectRef.current?.addEventListener("keydown", handler);

    return () => selectRef.current?.removeEventListener("keydown", handler);
  }, [options[chosenOption].disable, chosenOption]);

  const toggleOptions = (e: any) => {
    if (options.length * 28 + e.clientY > window.innerHeight) {
      setDropdownPos("top");
    } else {
      setDropdownPos("bottom");
    }

    setExpandOptions((prev) => !prev);
  };

  const onOptionClick = (v: Option, i: number) => {
    if (v.disable) return;
    setChosenOption(i);
    onChange && onChange(name, options[i].value);
  };

  return (
    <div
      tabIndex={0}
      ref={selectRef as React.RefObject<HTMLDivElement>}
      className="relative select-none"
    >
      <div
        onClick={toggleOptions}
        className="text-sm text-gray-12 px-3 min-w-[132px] w-full py-2 rounded bg-opac-w-1 border border-opac-w-1 cursor-pointer"
      >
        {options[chosenOption].title}
      </div>
      {expandOptions && (
        <ul
          className={`absolute ${
            dropdownPos === "bottom" ? "top-full" : "bottom-full"
          } right-0 z-30 w-full p-2 bg-gray-2`}
        >
          {options.map((v, i) => (
            <li
              key={i}
              onClick={() => {
                onOptionClick(v, i);
              }}
              className={`text-sm ${
                v.value === options[chosenOption].value
                  ? "bg-blue-9"
                  : "hover:bg-opac-w-1 "
              } cursor-pointer py-1 px-2 ${
                v.disable
                  ? "text-gray-8 cursor-default hover:bg-transparent"
                  : ""
              }  rounded text-gray-12`}
            >
              {v.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
