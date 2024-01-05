import {render} from "@testing-library/react";
import ProductCard from "../ProductCard/ProductCard";


/* eslint-disable react/display-name */
jest.mock("../AddToCartWidget/AddToCartWidget", () => () => <div>AddToCartWidget</div>)
/* eslint-enable react/display-name */

describe("ProductCard", () => {
    test("renders product image, title, description, category and price and the AddToCartWidget", () => {
        const product = {"id":1,"title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops","price":109.95,"description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing","image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","rating":{"rate":3.9,"count":120}}
        const {container} = render(<ProductCard product={product}></ProductCard>);
        expect(container).toMatchSnapshot();
    })
})