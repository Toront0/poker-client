import { Link } from "react-router-dom";

const DropdownLinkItem = ({
  children,
  href
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link
      to={href}
      className="flex items-center justify-between w-full hover:bg-opac-w-1 rounded px-2 py-1.5"
    >
      {children}
    </Link>
  );
};

export default DropdownLinkItem;
