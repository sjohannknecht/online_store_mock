import {useOutletContext} from "react-router-dom";
import ShoppingCartItem from "../../components/ShoppingCartItem/ShoppingCartItem";
import "./ShoppingCart.css";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import {useRef} from "react";

function ShoppingCart() {
    const {products, shoppingCart, dispatchShoppingCart} = useOutletContext();
    const totalPrice = calculateTotalPrice(products, shoppingCart);
    const modalRef = useRef(null);

    function calculateTotalPrice(products, shoppingCart) {
        const items = shoppingCart.getItems();
        return Object.keys(items).reduce(
            (accumulator, productId) =>
                products.find(prod => prod.id.toString() === productId.toString()).price * items[productId] + accumulator, 0);
    }

    function handleCheckout() {
        console.log(modalRef)
        modalRef.current.showModal();
    }

    return <>
        <h1>Cart</h1>
        <div className="ShoppingCart Card">
            {
                shoppingCart.getProductIds().map(productId => {
                    const product = products.find(prod => prod.id.toString() === productId);
                    return <ShoppingCartItem
                        key={productId}
                        product={product}
                        quantity={shoppingCart.items[productId]}
                        dispatchShoppingCart={dispatchShoppingCart}>
                    </ShoppingCartItem>
                })
            }
            {shoppingCart.getQuantityAll() === 0 && <div className="ShoppingCart__placeholder">Shopping Cart is empty</div>}
        </div>
        {shoppingCart.getQuantityAll() !== 0 &&
            <div className="ShoppingCart__checkout-container">
                <p className="ShoppingCart__total-price">Total: {totalPrice} $</p>
                <Button className="ShoppingCart__checkout-button Button--secondary" onClick={handleCheckout}>Checkout</Button>
            </div>
        }
        <Modal ref={modalRef}>
            This web shop is a prototype for demonstration purposes. There&apos;s no checkout and the demo ends here.
        </Modal>
    </>;
}

export default ShoppingCart;