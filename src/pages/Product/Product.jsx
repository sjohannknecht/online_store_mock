import {useOutletContext, useParams} from "react-router-dom";

function Product() {
    const products = useOutletContext();
    const {id} = useParams();
    const product = products.find(product => product.id.toString() === id);
    console.log(products)
    console.log(id)
    console.log(product)
    if (!product) {
        return <p>Product not found</p>
    }

    return <>
        <h2>{product.title}</h2>
        <img src={product.image} alt={product.title}></img>
        <p>{product.price}</p>
        <p>{product.description}</p>
        <p>{product.category}</p>
    </>;
}

export default Product;