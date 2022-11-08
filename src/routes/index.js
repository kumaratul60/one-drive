import React from "react";
import { Navigate } from "react-router-dom";

const Home = React.lazy(() => import("../pages/Home"));

const defaultRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: () => <Navigate to={"/"} />,
  },
];

export default defaultRoutes;
