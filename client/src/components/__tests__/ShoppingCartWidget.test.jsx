import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ShoppingCartWidget from "../ShoppingCartWidget/ShoppingCartWidget";
import shoppingCartFactory from "../../services/shoppingCart";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";

describe("ShoppingCartWidget", () => {
  test("renders the shopping cart symbol.", () => {
    render(<ShoppingCartWidget></ShoppingCartWidget>);
    expect(screen.getByAltText(/Shopping Cart Symbol/i)).toBeInTheDocument();
  });

  test("renders no count if shoppingCart prop is undefined.", () => {
    render(<ShoppingCartWidget></ShoppingCartWidget>);
    expect(screen.getByLabelText(/Shopping Cart Count/i).textContent).toEqual(
      "",
    );
  });

  test("renders the total quantity of 6 when a shopping cart with 6 items total is passed as prop.", () => {
    const cart = shoppingCartFactory({
      items: {
        1: 3,
        3: 2,
        4: 1,
      },
    });
    render(
      <ShoppingCartContext.Provider value={cart}>
        <ShoppingCartWidget></ShoppingCartWidget>
      </ShoppingCartContext.Provider>,
    );
    expect(screen.getByLabelText(/Shopping Cart Count/i).textContent).toEqual(
      "6",
    );
  });
});
