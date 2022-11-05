import React from "react";
import { Redirect } from "react-router-dom";

// view page
// import Home from "../pages/Home";
const Home = React.lazy(() => import("../pages/Home"));

const defaultRoutes = [
  {
    path: "/",
    exact: true,
    component: Home,
    isProtected: false, // not relevant in toddle-exercise [NO-AUTH]
  },
  {
    path: "*",
    component: () => <Redirect to={"/"} />,
    isProtected: false,
  },
];

export default defaultRoutes;
