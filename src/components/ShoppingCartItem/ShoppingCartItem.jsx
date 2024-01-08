import Button from "../ui/Button";
import PropTypes from "prop-types";
import "./ShoppingCartItem.css";

function ShoppingCartItem({product, quantity, dispatchShoppingCart}) {
    const subTotal = (product.price * quantity).toFixed(2);

    function handleDecrement() {
        dispatchShoppingCart({
            type: "decrement",
            productId: product.id,
        })
    }

    function handleIncrement() {
        dispatchShoppingCart({
            type: "increment",
            productId: product.id,
        })
    }

    function handleRemove() {
        dispatchShoppingCart({
            type: "clear",
            productId: product.id,
        })
    }

    return <div className="ShoppingCartItem__container">
        <div className="ShoppingCartItem__image-wrapper">
            <img src={product.image} alt={product.title}></img>
        </div>
        <div className="ShoppingCartItem__info-wrapper">
            <h2 className="ShoppingCartItem__header">{product.title}</h2>
            <p className="ProductCard__info--secondary">{product.category}</p>
            <p>{product.description}</p>
            <span className="ProductCard__info--underlined">Price: {product.price} $</span>
            <div className="ShoppingCartItem__quantity-changer">
                <Button onClick={handleDecrement} className="Button--square">
                    -
                </Button>
                <span>{quantity}</span>
                <Button onClick={handleIncrement} className="Button--square">
                    +
                </Button>
            </div>
            <Button onClick={handleRemove} className="Button--accent">Remove from Cart</Button>
            <p className="ShoppingCartItem__subtotal">Subtotal: {subTotal} $</p>
        </div>
    </div>
}

ShoppingCartItem.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        category: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
    }),
    quantity: PropTypes.number,
    dispatchShoppingCart: PropTypes.func,
}

export default ShoppingCartItem;