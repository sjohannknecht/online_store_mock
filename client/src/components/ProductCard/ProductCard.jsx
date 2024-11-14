import Card from "../ui/Card";
import PropTypes from "prop-types";
import "./ProductCard.css";
import AddToCartWidget from "../AddToCartWidget/AddToCartWidget";

function ProductCard({ product }) {
  return (
    <Card className="ProductCard">
      <h1>{product.title}</h1>
      <div className="ProductCard__container">
        <div className="ProductCard__image-wrapper">
          <img src={product.image} alt={product.title}></img>
        </div>
        <div className="ProductCard__info">
          <p className="ProductCard__info--secondary">{product.category}</p>
          <p>{product.description}</p>
          <span className="ProductCard__info--underlined">
            Price: {product.price} $
          </span>
        </div>
        <div className="ProductCard__widget-wrapper">
          <AddToCartWidget product={product}></AddToCartWidget>
        </div>
      </div>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default ProductCard;
