import ShoppingCart from "../../assets/imgs/shopping-cart.svg";
import PropTypes from "prop-types";
import "./ShoppingCartWidget.css";

function ShoppingCartWidget({shoppingCart}) {
    return <div className="ShoppingCartWidget" aria-label="Shopping Cart Widget">
        <img src={ShoppingCart} alt="Shopping Cart Symbol" className="ShoppingCartWidget__image"></img>
        <span className="ShoppingCartWidget__count" aria-label="Shopping Cart Count">{shoppingCart && shoppingCart.length}</span>
    </div>
}

ShoppingCartWidget.propTypes = {
    shoppingCart: PropTypes.array,
}

export default ShoppingCartWidget;