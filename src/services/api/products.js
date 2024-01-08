async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products/");
  if (!response.ok) {
    throw new Error("Network response was not OK.");
  }
  return await response.json();
}

export { getProducts };
