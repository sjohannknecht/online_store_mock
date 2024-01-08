import Tile from "../ui/Tile";
import PropTypes from "prop-types";
import "./ProductTile.css";

function ProductTile({ product }) {
  if (!product) {
    return <Tile>Product not available</Tile>;
  }

  return (
    <Tile>
      <img
        className="Product-tile__image"
        src={product.image}
        alt={product.title}
      ></img>
      <h3 className="Product-tile__heading">{product.title}</h3>
      <strong className="Product-tile__price">{product.price} $</strong>
    </Tile>
  );
}

ProductTile.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default ProductTile;
