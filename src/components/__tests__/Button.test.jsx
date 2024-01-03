import Button from "../ui/Button";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'

describe("Button", () => {
    test("displays its children.", () => {
        const buttonText = "test";
        render(<Button>{buttonText}</Button>);
        expect(screen.getByText(/test/i)).toBeInTheDocument();
    })

    test("calls onClick function passed as prop on click.", async () => {
        const user = userEvent.setup();
        const mockFunction = jest.fn();
        render(<Button onClick={mockFunction}>Test</Button>);
        await user.click(screen.getByText(/test/i));
        expect(mockFunction).toHaveBeenCalled();
    })
})