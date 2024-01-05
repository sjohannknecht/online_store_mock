import shoppingCartReducer from "./shoppingCartReducer";
import shoppingCartFactory from "../services/shoppingCart";

describe("shoppingCartReducer:", () => {
    describe("case: add", () => {
            test("adds the quantity to an already existing productId property in state", () => {
                const oldState = shoppingCartFactory({
                    items: {
                        "1": 2,
                    }
                });
                const newState = shoppingCartReducer(oldState, {
                    type: "add",
                    productId: 1,
                    quantity: 3,
                })
                expect(newState.items[1]).toEqual(5);
            })

            test("creates new productId property in state and assigns the quantity and doesnt touch other productIds", () => {
                const oldState = shoppingCartFactory({
                    items: {
                        "1": 2,
                        "13": 12,
                    }
                });
                const newState = shoppingCartReducer(oldState, {
                    type: "add",
                    productId: 2,
                    quantity: 1,
                })
                expect(newState.items[1]).toEqual(2);
                expect(newState.items[2]).toEqual(1);
                expect(newState.items[13]).toEqual(12);
            })

            test("creates new productId property in state and assigns the quantity", () => {
                const oldState = shoppingCartFactory();
                const newState = shoppingCartReducer(oldState, {
                    type: "add",
                    productId: 5,
                    quantity: 3,
                })
                expect(newState.items[5]).not.toBeUndefined();
            })
        }
    )
    describe("case: increment", () => {
        test("throws Error if productId is not already in cart", () => {
            const oldState = shoppingCartFactory({
                items: {
                    "1": 2,
                }
            });
            expect(() => shoppingCartReducer(oldState, {
                type: "increment",
                productId: 2,
            })).toThrow();
        })

        test("to increment quantity of existing productId by 1", () => {
            const oldState = shoppingCartFactory({
                items: {
                    "1": 2,
                }
            });
            const newState = shoppingCartReducer(oldState, {
                type: "increment",
                productId: 1,
            })
            expect(newState.items[1]).toEqual(3);
        })
    })

    describe("case: decrement", () => {
        test("throws Error if productId is not already in cart", () => {
            const oldState = shoppingCartFactory({
                items: {
                    "1": 2,
                }
            });
            expect(() => shoppingCartReducer(oldState, {
                type: "decrement",
                productId: 2,
            })).toThrow();
        })

        test("to decrement quantity of existing productId by 1", () => {
            const oldState = shoppingCartFactory({
                items: {
                    "1": 2,
                }
            });
            const newState = shoppingCartReducer(oldState, {
                type: "decrement",
                productId: 1,
            })
            expect(newState.items[1]).toEqual(1);
        })

        test("to delete property if quantity of product would reach zero", () => {
            const oldState = shoppingCartFactory({
                items: {
                    "1": 1,
                }
            });
            const newState = shoppingCartReducer(oldState, {
                type: "decrement",
                productId: 1,
            })
            expect(newState.items[1]).toBeUndefined();
        })
    })

    describe("case: clear", () => {
        test("does not throw Error if productId is not already in cart", () => {
            const oldState = shoppingCartFactory({
                items: {
                    "1": 2,
                }
            });
            expect(() => shoppingCartReducer(oldState, {
                type: "clear",
                productId: 2,
            })).not.toThrow();
        })

        test("to delete property if quantity of product would reach zero", () => {
            const oldState = shoppingCartFactory({
                items: {
                    "1": 1,
                }
            });
            const newState = shoppingCartReducer(oldState, {
                type: "clear",
                productId: 1,
            })
            expect(newState.items[1]).toBeUndefined();
        })
    })

    describe("case: clearAll", () => {
        test("returns empty Object", () => {
            const oldState = shoppingCartFactory({
                items: {
                    "1": 2,
                    "13": 12,
                }
            });
            const newState = shoppingCartReducer(oldState, {
                type: "clearAll",
            })
            expect(Object.keys(newState.items).length).toEqual(0);
        })
    })
})