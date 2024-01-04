import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import ShoppingCartWidget from "../ShoppingCartWidget/ShoppingCartWidget";


describe("ShoppingCartWidget", () => {
    test("renders the shopping cart symbol.", () => {
        render(<ShoppingCartWidget></ShoppingCartWidget>);
        expect(screen.getByAltText(/Shopping Cart Symbol/i)).toBeInTheDocument();
    })

    test("renders no count if shoppingCart prop is undefined.", () => {
        render(<ShoppingCartWidget></ShoppingCartWidget>);
        expect(screen.getByLabelText(/Shopping Cart Count/i).textContent).toEqual("");
    })

    test("renders the length of the array as the shopping cart count.", () => {
        const array = [1, 3, 4]
        render(<ShoppingCartWidget shoppingCart={array}></ShoppingCartWidget>);
        expect(screen.getByLabelText(/Shopping Cart Count/i).textContent).toEqual(array.length.toString());
    })
})