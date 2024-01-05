import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {createMemoryRouter, RouterProvider} from "react-router-dom";
import routes from "../../routes";
import {enableFetchMocks} from "jest-fetch-mock";


// Remove loaders before testing to facilitate testing the routes
routes.forEach((topLevelRoute) => {
    if (Object.prototype.hasOwnProperty.call(topLevelRoute, "loader")) {
        delete topLevelRoute.loader;
    }
    topLevelRoute.children.forEach((route) => {
        if (Object.prototype.hasOwnProperty.call(route, "loader")) {
            delete route.loader;
        }
    })
})
// Testing the react router Links did only work after mocking fetch
enableFetchMocks();

//mock the useOutletContext hook of react-router-dom cause the Projects component gets its data from it
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useOutletContext: () => (
        {products: [{"id":1,"title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops","price":109.95,"description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing","image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","rating":{"rate":3.9,"count":120}}]}
    ),
}));


describe("Products", () => {
    test("renders the tiles for the individual products", () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/products"]
        });
        render(<RouterProvider router={router}></RouterProvider>);
        expect(screen.getByText(/Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops/i)).toBeInTheDocument()
    })
    test("directs to the corresponding product page when clicking the Link of a product", async () => {
        const user = userEvent.setup();
        const router = createMemoryRouter(routes, {
            initialEntries: ["/products"]
        });
        render(<RouterProvider router={router}></RouterProvider>);
        await user.click(screen.getByText(/Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops/i));
        expect(await screen.findByText(/men's clothing/i)).toBeInTheDocument()
        expect(await screen.findByText(/Your perfect pack for everyday use and walks in the forest. Stash your laptop \(up to 15 inches\) in the padded sleeve, your everyday/i)).toBeInTheDocument()
    })
})