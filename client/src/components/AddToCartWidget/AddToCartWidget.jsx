import "./AddToCartWidget.css";
import Button from "../ui/Button";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

function AddToCartWidget({ product }) {
  const [numberInput, setNumberInput] = useState(1);
  const { dispatchShoppingCart } = useOutletContext();
  const [addedToCartHistory, setAddedToCartHistory] = useState([]);

  function handleAddToCart() {
    dispatchShoppingCart({
      type: "add",
      productId: product.id,
      quantity: numberInput,
    });
    setAddedToCartHistory((previous) => [...previous, numberInput]);
  }

  function handleNumberInput(event) {
    setNumberInput(event.target.value);
  }

  if (!product) {
    return <div>Product not available.</div>;
  }

  return (
    <div className="AddToCartWidget">
      <label htmlFor={product.id.toString()} className="for">
        Quantity:
      </label>
      <input
        id={product.id.toString()}
        className="AddToCartWidget__input"
        type="number"
        onInput={handleNumberInput}
        min="1"
        value={numberInput}
      />
      <Button className="Button--secondary" onClick={handleAddToCart}>
        Add to Cart
      </Button>
      {addedToCartHistory.map((element, index) => (
        <p className="AddToCartWidget__success-message" key={index}>
          {`${element} ${element === 1 ? "item" : "items"} added to cart`}
        </p>
      ))}
    </div>
  );
}

AddToCartWidget.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default AddToCartWidget;
