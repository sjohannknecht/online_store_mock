import { fetchWrapper } from "./util/fetchWrapper";

async function getProducts() {
  return fetchWrapper.get("https://fakestoreapi.com/products/");
}

export { getProducts };
