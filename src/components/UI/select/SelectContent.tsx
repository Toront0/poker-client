import React, { useContext, useEffect, useRef } from "react";
import { SelectContext } from "../../../lib/context/select-context";
import { clamp } from "../../../lib/utils";

const SelectContent = ({
  children
}: {
  children: React.ReactElement<HTMLLIElement>[];
}) => {
  const {
    isOpen,
    currValue,
    setCurrValue,
    chosenOption,
    setChosenOption,
    setIsOpen
  } = useContext(SelectContext);
  const selectRef = useRef<HTMLUListElement>();

  const vals = React.Children;

  useEffect(() => {
    // if (options[chosenOption].disable) {
    //   setChosenOption(options.findIndex((v) => !v.disable));
    // }

    console.log("777");

    const handler = (e: any) => {
      // if (e.target !== selectRef.current) {
      //   return;
      // }

      switch (e.key) {
        case "Tab":
          setIsOpen((prev) => !prev);
          break;
        case "Enter":
        case " ":
          setIsOpen((prev) => !prev);
          break;
        case "ArrowUp":
        case "ArrowDown":
          console.log("e.key", e.key);
          const newV = e.key === "ArrowUp" ? -1 : 1;
          setChosenOption((prev) =>
            clamp(0, (childrens?.length || 0) - 1, prev + newV)
          );
          const childrens = React.Children.map(children, (v) => v.props);

          setCurrValue(childrens[newV].value);
        // if (onChange) onChange(name, chosenOption);
      }
    };

    document.addEventListener("keydown", handler);

    // return () => selectRef.current?.removeEventListener("keydown", handler);
  }, [currValue, chosenOption]);

  console.log("currValue", chosenOption);

  return (
    <>
      {isOpen && (
        <ul
          ref={selectRef as React.Ref<HTMLUListElement>}
          className={`absolute  right-0 z-30 flex flex-col gap-2 w-full p-2 bg-gray-2`}
        >
          {children}
        </ul>
      )}
    </>
  );
};

export default SelectContent;
