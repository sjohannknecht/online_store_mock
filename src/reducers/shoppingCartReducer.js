import shoppingCartFactory from "../services/shoppingCart";

function shoppingCartReducer(state, action) {
    switch (action.type) {
        case "add": {
            return shoppingCartFactory(state).add(action.productId, action.quantity);
        }
        case "increment": {
            return shoppingCartFactory(state).increment(action.productId);
        }
        case "decrement": {
            return shoppingCartFactory(state).decrement(action.productId);
        }
        case "clear": {
            return shoppingCartFactory(state).clear(action.productId);
        }
        case "clearAll": {
            return shoppingCartFactory();
        }
        default: {
            throw new Error("Unknown action type in shoppingCartReducer");
        }
    }
}

export default shoppingCartReducer;