import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, loader } from "./routes/Home/Home";
import {
  UserDetail,
  loader as userLoader
} from "./routes/UserDetail/UserDetail";
import PokerTable from "./routes/PokerTable/PokerTable";
import CreateGame from "./routes/CreateGame/CreateGame";
import { useAuthState } from "./store/store";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/",
    loader: loader
  },
  {
    element: <UserDetail />,
    path: "/:slug",
    loader: userLoader
  },
  {
    element: <PokerTable />,
    path: "/game/:id"
  },
  {
    element: <CreateGame />,
    path: "/create-game"
  }
]);

const App = () => {
  const authenticate = useAuthState((state) => state.authenticate);

  useEffect(() => {
    authenticate();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
