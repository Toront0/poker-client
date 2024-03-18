import { Link } from "react-router-dom";

interface IUserDetailNavigation {
  userId: number;
}

const UserDetailNavigation = ({ userId }: IUserDetailNavigation) => {
  return (
    <div className="flex items-center gap-4 mt-4 text-gray-12 text-sm">
      <Link
        to={`/${userId}`}
        className="underline underline-offset-4 decoration-2"
      >
        Игры
      </Link>
    </div>
  );
};

export default UserDetailNavigation;
