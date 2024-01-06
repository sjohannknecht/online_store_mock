import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";

describe("ShoppingCartItem component", () => {
    const product = {"id":1,"title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops","price":109.95,"description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing","image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","rating":{"rate":3.9,"count":120}};
    const mockFunction = jest.fn();

    test("the product and its properties are displayed on the page", () => {
        render(<ShoppingCartItem product={product}
                                 quantity={2}
                                 dispatchShoppingCart={mockFunction}></ShoppingCartItem>);
        expect(screen.getByAltText(/Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops/i)).toBeInTheDocument();
        expect(screen.getByText(/Your perfect pack for everyday use and walks in the forest. Stash your laptop \(up to 15 inches\) in the padded sleeve, your everyday/i)).toBeInTheDocument();
        expect(screen.getByText(/men's clothing/i)).toBeInTheDocument();
        expect(screen.getByText(/Price: 109.95 \$/i)).toBeInTheDocument();
        expect(screen.getByText(/Subtotal: 219.9 \$/i)).toBeInTheDocument();
    })

    test("when clicking the minus-button the decrement-action is dispatched", async () => {
        const user = userEvent.setup();
        render(<ShoppingCartItem product={product}
                                 quantity={2}
                                 dispatchShoppingCart={mockFunction}></ShoppingCartItem>);
        await user.click(screen.getByText("-"));
        expect(mockFunction.mock.lastCall[0].type).toBe("decrement");
    })

    test("when clicking the plus-button the increment-action is dispatched", async () => {
        const user = userEvent.setup();
        render(<ShoppingCartItem product={product}
                                 quantity={2}
                                 dispatchShoppingCart={mockFunction}></ShoppingCartItem>);
        await user.click(screen.getByText("+"));
        expect(mockFunction.mock.lastCall[0].type).toBe("increment");
    })

    test("when clicking the remove-from-cart-button the clear-action is dispatched", async () => {
        const user = userEvent.setup();
        render(<ShoppingCartItem product={product}
                                 quantity={2}
                                 dispatchShoppingCart={mockFunction}></ShoppingCartItem>);
        await user.click(screen.getByText(/remove from cart/i));
        expect(mockFunction.mock.lastCall[0].type).toBe("clear");
    })
})