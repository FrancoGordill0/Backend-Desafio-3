import { Router } from "express";
import path from "path"
import { fileURLToPath } from "url";
const router = Router();
import ProductManager from "../../database/models/ProductManager.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url))
const productManager = new ProductManager(
    path.join(__dirname, "../../database/products.json")
);


export default router;