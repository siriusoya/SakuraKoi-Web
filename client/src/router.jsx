import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DetailPage from "./pages/DetailPage";
import ProductsPage from "./pages/ProductsPage";

import App from "./App";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProductsPage />,
      },
      {
        path: "/products/:productId",
        element: <DetailPage />,
      }
    ],
  }
]);

export default router;
