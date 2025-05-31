import { createBrowserRouter } from "react-router-dom";
import { DetailsRoot, Loader } from "./Detail";

import Home from "./homepage";
import Main from "./main";
import Error404 from "./404";

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
    ],
  },

  {
    path: "*",
    element: <Error404 />,
  },
]);
