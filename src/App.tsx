import { lazy, useEffect } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, loader } from "./routes/Home/Home";
import { loader as userLoader } from "./routes/UserDetail/UserDetail";
import { useAuthState } from "./store/store";

import ErrorPage from "./routes/ErrorPage";
import VIPSubscription from "./routes/VIPSubscription/VIPSubscription";
import CreateGame from "./routes/CreateGame/CreateGame";

const PokerTable = lazy(() => import("./routes/PokerTable/PokerTable"));
const UserDetail = lazy(() => import("./routes/UserDetail/UserDetail"));

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
    path: "/create-game"
  },
  {
    element: <VIPSubscription />,
    path: "/vip"
  }
]);

const App = () => {
  const authenticate = useAuthState((state) => state.authenticate);

  useEffect(() => {
    console.log("333");

    authenticate();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
