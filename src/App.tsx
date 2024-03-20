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
import ErrorPage from "./routes/ErrorPage";

const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/",
    loader: loader,
    errorElement: <ErrorPage />
  },
  {
    element: <UserDetail />,
    path: "/:slug",
    loader: userLoader,
    errorElement: <ErrorPage />
  },
  {
    element: <PokerTable />,
    path: "/game/:id",
    errorElement: <ErrorPage />
  },
  {
    element: <CreateGame />,
    path: "/create-game",
    errorElement: <ErrorPage />
  }
]);

const App = () => {
  const authenticate = useAuthState((state) => state.authenticate);

  useEffect(() => {
    console.log("321");

    authenticate();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
