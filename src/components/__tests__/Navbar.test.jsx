import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import Navbar from "../Navbar/Navbar";
import {MemoryRouter} from 'react-router-dom'

describe("Navbar", () => {
    test("renders with one list and zero list items if no entries as prop are provided", () => {
        render(<Navbar></Navbar>)
        expect(screen.getByRole("list")).toBeInTheDocument();
        expect(screen.queryAllByRole("listitem").length).toEqual(0);
    })

    test("renders with one list and two list items if two entries as prop are provided", () => {
        const entries = [
            {
                title: "Home",
                path: "/",
                content: "home-logo"
            },
            {
                title: "Products",
                path: "products",
                content: "Products"
            }]
        render(<Navbar entries={entries}></Navbar>, {wrapper: MemoryRouter})
        expect(screen.getByRole("list")).toBeInTheDocument();
        expect(screen.queryAllByRole("listitem").length).toEqual(2);
    })
})