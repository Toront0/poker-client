import React, { useContext } from "react";
import { SelectContext } from "../../../lib/context/select-context";

interface ISelectOption extends React.LiHTMLAttributes<HTMLLIElement> {}

const SelectOption = ({ ...rest }: ISelectOption) => {
  const { currValue, setCurrValue } = useContext(SelectContext);

  const vals = React.Children.map(rest.children, (v) => v);

  console.log("rest.children", rest);

  return (
    <li
      {...rest}
      onClick={() => setCurrValue(rest.value)}
      className={`text-sm ${
        rest.value === currValue ? "bg-purple-8" : "hover:bg-opac-w-1 "
      } cursor-pointer py-1 px-2 rounded text-gray-12`}
    >
      {rest.children}
    </li>
  );
};

export default SelectOption;
