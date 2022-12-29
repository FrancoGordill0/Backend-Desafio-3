import { Router } from "express";
import path from "path"
import { fileURLToPath } from "url";
const router = Router();
import ProductManager from "../../database/models/ProductManager.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url))
const productManager = new ProductManager(
    path.join(__dirname, "../../database/products.json")
);

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const limit = req.query.limit;
        let limitedProducts;
        if (limit) {
            limitedProducts = products.slice(0, limit);
        }
        res.send(limitedProducts || products);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

router.post("/create", async (req, res) => {
    try {
        //const products = await productManager.getProducts();
        const newProduct = req.body;
        await productManager.addProducts(newProduct);
        res.send(newProduct);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
     try {
        const pid = req.params.id;
        const product = await productManager.getProductById(pid);
        if (!product) {
            const errorMessage = {
                error: "El Producto No Existe"
            };
            res.status(500).send(errorMessage);
        }
        res.send(product);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const {title, description, price, stock} = req.body;
        await productManager.updateProduct(
            {title, description, price, stock},
        {
            where: {
                id,
            },
        }
        )
        res.status(200).send('Producto Actualizado')
    } catch (err) {
        res.status(400).send('No se pudo actualizar el archivo');
        console.log(err);
    }
})

/* router.put("/:id", async (req, res) => {
    const pid = req.params.id;
    const newProduct = req.body;

    try {
        const products = productManager.getProducts();
        const productFindIndex = products.findIndex((product) => product.id === pid);
        if (productFindIndex === -1){
            res.status(404).send("Producto no encontrado");
            return;
        } else {
            products[productFindIndex] = newProduct;
            await productManager.updateProduct(products);
            res.send(newProduct)
            res.status(200).send('Producto Actualizado')
        }
    } catch (err) {
        res.status(400).send('No se pudo actualizar el archivo');
        console.log(err);
    }
}) */

router.delete("/:id", async (req,res) => {
    try {
        const pid = req.params.id;
        await productManager.deleteProduct(pid)
        res.status(200).send("Producto eliminado")
    } catch (error) {
        if (!id) {
        res.status(400).send("No se pudo eliminar el producto")
        }
    }
})

export default router