import Navbar from "./components/Navbar/Navbar";
import { Outlet, useLoaderData } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import ShoppingCartWidget from "./components/ShoppingCartWidget/ShoppingCartWidget";
import { useReducer } from "react";
import shoppingCartReducer from "./reducers/shoppingCartReducer";
import { ShoppingCartContext } from "./context/ShoppingCartContext";
import shoppingCartFactory from "./services/shoppingCart";
import WarningBanner from "./components/WarningBanner/WarningBanner";
import UserNavBarElement from "./components/UserNavBarElement/UserNavBarElement";
import useUser from "./hooks/useUser";

const NAVBAR_ENTRIES = [
  {
    title: "Home",
    path: "/",
    content: (
      <>
        <span>MOCK</span>store
      </>
    ),
  },
  {
    path: "products",
    content: "Products",
  },
  {
    path: "shopping-cart",
    content: <ShoppingCartWidget></ShoppingCartWidget>,
  },
  {
    path: "login",
    content: <UserNavBarElement></UserNavBarElement>,
  },
];

const FOOTER_ENTRIES = [
  {
    title: "Data privacy",
    path: "data-privacy",
  },
  {
    title: "Imprint",
    path: "imprint",
  },
];

function App() {
  const products = useLoaderData();

  const { user, setUser } = useUser();
  const [shoppingCart, dispatchShoppingCart] = useReducer(
    shoppingCartReducer,
    shoppingCartFactory(),
  );

  return (
    <>
      <header>
        <ShoppingCartContext.Provider value={shoppingCart}>
          <Navbar entries={NAVBAR_ENTRIES}></Navbar>
        </ShoppingCartContext.Provider>
        <WarningBanner message="+++ This website is a prototype. The items are not real and cannot be purchased! +++"></WarningBanner>
      </header>
      <main className="content-container">
        <Outlet
          context={{
            user,
            setUser,
            products,
            shoppingCart,
            dispatchShoppingCart,
          }}
        ></Outlet>
      </main>
      <Footer entries={FOOTER_ENTRIES}></Footer>
    </>
  );
}

export default App;
