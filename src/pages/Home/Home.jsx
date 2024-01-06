import Card from "../../components/ui/Card";
import "./Home.css";

function Home() {
    return <>
        <h1>Home</h1>
        <Card className="Home__message">This is a prototype for an online store. You can browse the mock products and add them to your shopping cart. Note that you cannot really purchase anything here.</Card>
    </>;
}

export default Home;