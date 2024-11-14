import ShoppingCart from "../../assets/imgs/shopping-cart.svg";
import "./ShoppingCartWidget.css";
import { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";

function ShoppingCartWidget() {
  const shoppingCart = useContext(ShoppingCartContext);

  return (
    <div className="ShoppingCartWidget" aria-label="Shopping Cart Widget">
      <img
        src={ShoppingCart}
        alt="Shopping Cart Symbol"
        className="ShoppingCartWidget__image"
      ></img>
      <span
        className="ShoppingCartWidget__count"
        aria-label="Shopping Cart Count"
      >
        {shoppingCart && shoppingCart.getQuantityAll()}
      </span>
    </div>
  );
}

export default ShoppingCartWidget;
