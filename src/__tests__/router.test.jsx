import {render, screen, getByText} from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {createMemoryRouter, RouterProvider} from "react-router-dom";
import routes from "../routes";
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

/* eslint-disable react/display-name */
jest.mock("../pages/Home/Home", () => () => <><h1>Home</h1><p>{"You're on the Home page"}</p></>)
jest.mock("../pages/Products/Products", () => () => <><h1>Products</h1><p>{"You're on the Products page"}</p></>)
jest.mock("../pages/Product/Product", () => () => <><h1>Product</h1><p>{"You're on the Product page"}</p></>)
jest.mock("../pages/Cart/Cart", () => () => <><h1>Cart</h1><p>{"You're on the Cart page"}</p></>)
jest.mock("../pages/User/User", () => () => <><h1>User</h1><p>{"You're on the User page"}</p></>)
jest.mock("../pages/DataPrivacy/DataPrivacy", () => () => <><h1>Data Privacy</h1><p>{"You're on the Data Privacy page"}</p></>)
jest.mock("../pages/Imprint/Imprint", () => () => <><h1>Imprint</h1><p>{"You're on the Imprint page"}</p></>)
/* eslint-enable react/display-name */

describe("Router", () => {

    test("renders error page on bad route", () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/bad/route"]
        });
        render(<RouterProvider router={router}></RouterProvider>);
        expect(screen.getByText(/error/i)).toBeInTheDocument()
    })

    test("renders the home page for the root route", () => {
        const router = createMemoryRouter(routes);
        render(<RouterProvider router={router}></RouterProvider>);
        expect(screen.getByText(/you're on the home page/i)).toBeInTheDocument()
    })

    test("renders the products page when starting from the route /products", () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/products"]
        });
        render(<RouterProvider router={router}></RouterProvider>);
        expect(screen.getByText(/you're on the products page/i)).toBeInTheDocument()
    })

    describe("renders the corresponding page when clicking a Link to a route:", () => {
        test("from Link to /products to Products page", async () => {
            const user = userEvent.setup();
            const router = createMemoryRouter(routes);
            render(<RouterProvider router={router}></RouterProvider>);
            const navbarList = document.querySelector(".Navbar__list");
            await user.click(getByText(navbarList, /Products/i));
            expect(await screen.findByText(/you're on the products page/i)).toBeInTheDocument()
        })

        test("from Link to /cart to Cart page", async () => {
            const user = userEvent.setup();
            const router = createMemoryRouter(routes);
            render(<RouterProvider router={router}></RouterProvider>);
            const navbarList = document.querySelector(".Navbar__list");
            await user.click(getByText(navbarList, /Cart/i));
            expect(await screen.findByText(/you're on the cart page/i)).toBeInTheDocument()
        })

        test("from Link to /user to User page", async () => {
            const user = userEvent.setup();
            const router = createMemoryRouter(routes);
            render(<RouterProvider router={router}></RouterProvider>);
            const navbarList = document.querySelector(".Navbar__list");
            await user.click(getByText(navbarList, /User/i));
            expect(await screen.findByText(/you're on the user page/i)).toBeInTheDocument()
        })

        test("from Link to /data-privacy to DataPrivacy", async () => {
            const user = userEvent.setup();
            const router = createMemoryRouter(routes);
            render(<RouterProvider router={router}></RouterProvider>);
            const footerList = document.querySelector(".Footer__list");
            await user.click(getByText(footerList, /Data Privacy/i));
            expect(await screen.findByText(/you're on the data privacy page/i)).toBeInTheDocument()
        })

        test("from Link to /imprint to Imprint", async () => {
            const user = userEvent.setup();
            const router = createMemoryRouter(routes);
            render(<RouterProvider router={router}></RouterProvider>);
            const footerList = document.querySelector(".Footer__list");
            await user.click(getByText(footerList, /Imprint/i));
            expect(await screen.findByText(/you're on the imprint page/i)).toBeInTheDocument()
        })
    })
})


