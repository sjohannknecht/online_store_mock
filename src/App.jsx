import Navbar from "./components/Navbar/Navbar";
import {Outlet, useLoaderData} from "react-router-dom";
import Footer from "./components/Footer/Footer";

const NAVBAR_ENTRIES = [
    {
        title: "Home",
        path: "/",
        content: "home-logo"
    },
    {
        title: "Products",
        path: "products",
        content: "Products"
    },
    {
        title: "User",
        path: "user",
        content: "User"
    },
    {
        title: "Cart",
        path: "cart",
        content: "Cart"
    }
]

const FOOTER_ENTRIES = [
    {
        title: "Data privacy",
        path: "data-privacy",
    },
    {
        title: "Imprint",
        path: "imprint",
    }
]

function App() {
    const products = useLoaderData();

    return <>
        <Navbar entries={NAVBAR_ENTRIES}></Navbar>
        <main className="content-container">
            <Outlet context={products}></Outlet>
        </main>
        <Footer entries={FOOTER_ENTRIES}></Footer>
    </>
}

export default App;