import { useOutletContext, useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";

function Product() {
  const { products } = useOutletContext();
  const { id } = useParams();
  const product = products.find((product) => product.id.toString() === id);
  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <section>
      <ProductCard product={product}></ProductCard>
    </section>
  );
}

export default Product;
