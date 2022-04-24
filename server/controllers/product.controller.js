import { getProducts } from "../services/product.service.js";

export async function controllerGetProducts(req, res) {
  try {
    const products = await getProducts();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(`Error: ${error.message}`);
  }
}

