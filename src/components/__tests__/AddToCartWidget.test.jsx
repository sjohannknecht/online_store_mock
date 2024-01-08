import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import AddToCartWidget from "../AddToCartWidget/AddToCartWidget";

//mock the useOutletContext hook of react-router-dom cause the AddToCartWidget component uses the dispatchShoppingCart function
const mockFunction = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: () => ({
    dispatchShoppingCart: mockFunction,
  }),
}));

describe("AddToCartWidget component", () => {
  const product = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 },
  };

  test("dispatchShoppingCart function is called when button is clicked", async () => {
    const user = userEvent.setup();
    render(<AddToCartWidget product={product}></AddToCartWidget>);
    await user.click(screen.getByRole("button"));
    expect(mockFunction).toHaveBeenCalled();
  });

  test("dispatchShoppingCart function is called with correct arguments when button is clicked", async () => {
    const user = userEvent.setup();
    render(<AddToCartWidget product={product}></AddToCartWidget>);
    await user.click(screen.getByRole("button"));
    expect(mockFunction.mock.lastCall[0].type).toBe("add");
    expect(mockFunction.mock.lastCall[0].productId).toBe(1);
    expect(mockFunction.mock.lastCall[0].quantity).toBe(1);
  });

  test("dispatchShoppingCart function is called with correct arguments when number input is changed and button is clicked", async () => {
    const user = userEvent.setup();
    render(<AddToCartWidget product={product}></AddToCartWidget>);
    await user.type(screen.getByRole("spinbutton"), "5");
    await user.click(screen.getByRole("button"));
    expect(mockFunction.mock.lastCall[0].type).toBe("add");
    expect(mockFunction.mock.lastCall[0].productId).toBe(1);
    expect(mockFunction.mock.lastCall[0].quantity).toBe("15");
  });
});
