import App from "./App";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import { getProducts } from "./services/api/products";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import User from "./pages/User/User";
import DataPrivacy from "./pages/DataPrivacy/DataPrivacy";
import Imprint from "./pages/Imprint/Imprint";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

const routes = [
  {
    path: "/",
    element: <App />,
    loader: getProducts,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { index: true, element: <Home></Home> },
      { path: "products", element: <Products></Products> },
      { path: "products/:id", element: <Product></Product> },
      { path: "shopping-cart", element: <ShoppingCart></ShoppingCart> },
      { path: "users", element: <User></User> },
      { path: "login", element: <Login></Login> },
      { path: "signup", element: <SignUp></SignUp> },
      { path: "data-privacy", element: <DataPrivacy></DataPrivacy> },
      { path: "imprint", element: <Imprint></Imprint> },
    ],
  },
];
export default routes;
