import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import NoAuth from "./NoAuth";
import HasAuth from "./HasAuth";
import { useAuthState } from "../../store/store";

import logo from "../../assets/logo.png";
import UserLoadingSkeleton from "./UserLoadingSkeleton";

const Header = () => {
  const authState = useAuthState();

  return (
    <header className="w-full h-14 px-2 justify-between flex items-center">
      <Link to="/" className="text-xl font-bold text-white">
        <img src={logo} alt="" />
      </Link>
      <SearchInput />
      {authState.isLoading ? (
        <UserLoadingSkeleton />
      ) : authState.user.id ? (
        <HasAuth />
      ) : (
        <NoAuth />
      )}
    </header>
  );
};

export default Header;
