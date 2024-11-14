import shoppingCartFactory from "../shoppingCart";

describe("shoppingCart", () => {
  let freshCart;
  beforeEach(() => {
    freshCart = shoppingCartFactory();
  });

  test("method add adds the quantity and returns object. method getQuantityByProductId returns the corresponding quantity", () => {
    const returnValue = freshCart.add(3, 1);
    expect(returnValue).toEqual(freshCart);
    expect(freshCart.getQuantityByProductId(3)).toEqual(1);
  });

  test("method getQuantityByProductId returns 0 if product not in cart", () => {
    expect(freshCart.getQuantityByProductId(3)).toEqual(0);
  });

  test("method getQuantityAll returns 0 if no products in cart", () => {
    expect(freshCart.getQuantityAll()).toEqual(0);
  });

  test("When creating a new shopping cart from an existing shopping cart, they maintain independent state", () => {
    freshCart.add(3, 1);
    const newCart = shoppingCartFactory(freshCart).add(3, 4);
    expect(freshCart.getQuantityByProductId(3)).toEqual(1);
    expect(newCart.getQuantityByProductId(3)).toEqual(5);
  });

  test("method getQuantityAll correctly returns the sum of all item quantities", () => {
    freshCart.add(3, 1);
    freshCart.add(4, 10);
    expect(freshCart.getQuantityAll()).toEqual(11);
  });

  test("method increment increments by 1 and returns the same cart object", () => {
    freshCart.add(6, 1);
    const returnValue = freshCart.increment(6);
    expect(returnValue).toEqual(freshCart);
    expect(freshCart.getQuantityByProductId(6)).toEqual(2);
  });

  test("method increment throws Error if productId not in cart", () => {
    expect(() => freshCart.increment(6)).toThrow();
  });

  test("method decrement decrements by 1 and returns the same cart object", () => {
    freshCart.add(6, 2);
    const returnValue = freshCart.decrement(6);
    expect(returnValue).toEqual(freshCart);
    expect(freshCart.getQuantityByProductId(6)).toEqual(1);
  });

  test("method decrement decrements by 1, deletes productId property if value becomes 0 and returns the same cart object", () => {
    freshCart.add(6, 1);
    const returnValue = freshCart.decrement(6);
    expect(returnValue).toEqual(freshCart);
    expect(freshCart.getQuantityByProductId(6)).toEqual(0);
    expect(Object.prototype.hasOwnProperty.call(freshCart.items, 6)).toBe(
      false,
    );
  });

  test("method decrement throws Error if productId not in cart", () => {
    expect(() => freshCart.decrement(6)).toThrow();
  });

  test("method clear deletes property and returns the same cart object", () => {
    freshCart.add(6, 1);
    const returnValue = freshCart.clear(6);
    expect(returnValue).toEqual(freshCart);
    expect(freshCart.getQuantityByProductId(6)).toEqual(0);
    expect(Object.prototype.hasOwnProperty.call(freshCart.items, 6)).toBe(
      false,
    );
  });
});
