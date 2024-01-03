import App from "./App";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import {getProducts} from "./services/products";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import User from "./pages/User/User";
import DataPrivacy from "./pages/DataPrivacy/DataPrivacy";
import Imprint from "./pages/Imprint/Imprint";

const routes = [
    {
        path: "/",
        element: <App />,
        loader: getProducts,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            { index: true, element: <Home></Home>, errorElement: <ErrorPage></ErrorPage>},
            { path: "products", element: <Products></Products>, errorElement: <ErrorPage></ErrorPage>},
            { path: "products/:id", element: <Product></Product>, errorElement: <ErrorPage></ErrorPage>},
            { path: "cart", element: <Cart></Cart> },
            { path: "user", element: <User></User> },
            { path: "data-privacy", element: <DataPrivacy></DataPrivacy> },
            { path: "imprint", element: <Imprint></Imprint> },
        ]
    },
];
export default routes;