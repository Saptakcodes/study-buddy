// routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "../Pages/Home";
import Summary from "../Pages/Summary";
import Quiz from "../Pages/Quiz";
import ErrorPage from "../Pages/ErrorPage";
import GetStarted from "../Pages/GetStarted";
import { Protect } from "@clerk/clerk-react";
import Dashboard from "../Pages/Dashboard";
import AIChat from "../Pages/AIChat";

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center text-xl">
    Loading...
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <GetStarted />,
  },
  {
    element: (
      <Protect fallback={<LoadingFallback />}>
        <Layout />
      </Protect>
    ),
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/summary",
        element: <Summary />,
      },
      {
        path: "/quiz",
        element: <Quiz />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/aichat",
        element: <AIChat />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
