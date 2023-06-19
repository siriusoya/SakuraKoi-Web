import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CategoriesPage from "./pages/CategoriesPage";
import AddAdminPage from "./pages/AddAdminPage";
import App from "./App";

const router = createBrowserRouter([
  {
    element: <App />,
    loader: () => {
      let token = localStorage.getItem("access_token")
      if(!token) {
        return redirect('/login')
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/add-admin",
        element: <AddAdminPage />,
      },
    ],
  },
  {
    path: "/login",
    loader: () => {
      let token = localStorage.getItem("access_token")
      if(token) {
        return redirect('/')
      }
      return null;
    },
    element: <LoginPage />,
  },
]);

export default router;
