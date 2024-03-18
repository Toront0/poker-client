import React from "react";

interface ISelectOption extends React.LiHTMLAttributes<HTMLLIElement> {}

const SelectOption = ({ ...rest }: ISelectOption) => {
  return (
    <li
      {...rest}

      // className={`text-sm ${
      //   rest.value === currValue ? "bg-purple-8" : "hover:bg-opac-w-1 "
      // } cursor-pointer py-1 px-2 rounded text-gray-12`}
    >
      {rest.children}
    </li>
  );
};

export default SelectOption;
