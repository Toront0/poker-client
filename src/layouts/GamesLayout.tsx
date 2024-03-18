import { Link, useLocation } from "react-router-dom";
import MainLayout from "./MainLayout";

const GamesLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <MainLayout>
      <div className="h-full w-full  py-4 px-2">
        <div className="w-full h-10 flex items-center gap-4 text-gray-8 font-medium">
          <Link to="/" className={`${pathname === "/" ? "text-white" : ""}`}>
            Лобби
          </Link>
          <Link
            to="/create-game"
            className={`${pathname === "/create-game" ? "text-white" : ""}`}
          >
            Создать игру
          </Link>
        </div>
        {children}
      </div>
    </MainLayout>
  );
};

export default GamesLayout;
