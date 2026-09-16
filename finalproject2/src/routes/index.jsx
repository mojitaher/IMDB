import { createBrowserRouter } from "react-router-dom";
import { DetailsRoot, Loader } from "./Detail";

import Home from "./homepage";
import Main from "./main";
import Error404 from "./404";
import Login from "./login";
import Signup from "./signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error404 />,
      },
      {
        path: "/Detail/:id",
        element: <DetailsRoot />,
        loader: Loader,
        errorElement: <Error404 />,
      },
      {
        path: "/Login",
        element: <Login />,
        errorElement: <Error404 />,
      },
      {
        path: "/Signup",
        element: <Signup />,
        errorElement: <Error404 />,
      },
    ],
  },

  {
    path: "*",
    element: <Error404 />,
  },
]);
