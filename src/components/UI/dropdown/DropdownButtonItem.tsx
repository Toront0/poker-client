interface IDropdownButtonItem
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DropdownButtonItem = ({ children, ...rest }: IDropdownButtonItem) => {
  return (
    <button
      {...rest}
      data-ignore-outside-clicks
      className="flex items-center justify-between w-full hover:bg-opac-w-1 rounded px-2 py-1.5"
    >
      {children}
    </button>
  );
};

export default DropdownButtonItem;
