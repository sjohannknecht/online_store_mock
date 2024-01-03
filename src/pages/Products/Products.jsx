import {Link, useOutletContext} from "react-router-dom";
import ProductTile from "../../components/ProductTile/ProductTile";
import "./Products.css"

function Products() {
    const products = useOutletContext();

    return <div className="Products">
        <h1 className="Products__heading">Products</h1>
        <div className="Products__grid">
            {products?.map(product => product
                ? <Link to={`/products/${product.id}`} className="Products__grid-tile" key={product.id}>
                    <ProductTile product={product} className="Products__grid-item"></ProductTile>
                </Link>
                : null)}
        </div>
    </div>;
}

export default Products;