import Navbar from "./components/Navbar/Navbar";
import { Outlet, useLoaderData } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import ShoppingCartWidget from "./components/ShoppingCartWidget/ShoppingCartWidget";
import { useReducer } from "react";
import shoppingCartReducer from "./reducers/shoppingCartReducer";
import { ShoppingCartContext } from "./context/ShoppingCartContext";
import shoppingCartFactory from "./services/shoppingCart";
import WarningBanner from "./components/WarningBanner/WarningBanner";

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
    path: "user",
    content: "User",
  },
  {
    path: "shopping-cart",
    content: <ShoppingCartWidget></ShoppingCartWidget>,
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
          context={{ products, shoppingCart, dispatchShoppingCart }}
        ></Outlet>
      </main>
      <Footer entries={FOOTER_ENTRIES}></Footer>
    </>
  );
}

export default App;
