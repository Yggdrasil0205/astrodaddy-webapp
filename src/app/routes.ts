import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Community from "./pages/Community";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import ForgotPassword from "./pages/ForgotPassword";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Webinar from "./pages/Webinar";
import Root from "./Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "community", Component: Community },
      { path: "product/:id", Component: ProductDetail },
      { path: "checkout", Component: Checkout },
      { path: "login", Component: Login },
      { path: "forgot-password", Component: ForgotPassword },
      { path: "impressum", Component: Impressum },
      { path: "datenschutz", Component: Datenschutz },
      { path: "webinar", Component: Webinar },
    ],
  },
]);