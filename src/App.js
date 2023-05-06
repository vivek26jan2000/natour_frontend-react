import Login from "./components/Login";
import RootLayout from "./components/RootLayout";
import Signup from "./components/Signup";
import Home from "./container/Home";
import Tour from "./container/Tour";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserAccount from "./container/UserAccount";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "tour/:tourId",
        element: <Tour />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "user/:userId",
        element: <UserAccount />,
      },
      // {
      //   path: "*",
      //   element: <UserAccount />,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
