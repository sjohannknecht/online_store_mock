import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import shoppingCartFactory from "../../services/shoppingCart";
import {useOutletContext} from "react-router-dom";

//mock the useOutletContext hook of react-router-dom cause the ShoppingCart uses it
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useOutletContext: jest.fn(),
}));

jest.mock("../../components/ShoppingCartItem/ShoppingCartItem", () => function Home() {return <h1>Shopping Cart Item</h1>})

describe("ShoppingCart", () => {
    test("renders message when cart is empty", () => {
        const cart = shoppingCartFactory();
        useOutletContext.mockImplementation(() => {
            return {
                products: [{
                    "id": 1,
                    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                    "price": 109.95,
                    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                    "category": "men's clothing",
                    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                    "rating": {"rate": 3.9, "count": 120}
                }],
                shoppingCart: cart,
                dispatchShoppingCart: jest.fn(),
            }})
        render(<ShoppingCart></ShoppingCart>);
        expect(screen.getByText(/Shopping Cart is empty/i)).toBeInTheDocument();
    })


    test("renders item when it is present in the cart", () => {
        const cart = shoppingCartFactory();
        cart.add(1,1);
        useOutletContext.mockImplementation(() => {
            return {
                products: [{
                    "id": 1,
                    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                    "price": 109.95,
                    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                    "category": "men's clothing",
                    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                    "rating": {"rate": 3.9, "count": 120}
                }],
                shoppingCart: cart,
                dispatchShoppingCart: jest.fn(),
            }})
        render(<ShoppingCart></ShoppingCart>);
        expect(screen.getByText(/Shopping Cart Item/i)).toBeInTheDocument();
    })
})