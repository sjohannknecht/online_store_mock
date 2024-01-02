import {useOutletContext} from "react-router-dom";

function Home() {
    const products = useOutletContext();
    return <>
        <h1>Home</h1>
        {products.map(product => <p key={product.id}>{product.title}</p>)}
    </>;
}

export default Home;