
import express from "express";
import path from "path";
import {fileURLToPath} from "url"
import productsRoutes from "./routes/api/products.routes.js"
import cartRoutes from "./routes/api/carts.routes.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express();
const port = 8080;


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(path.join((__dirname,"/public"))));


app.get("/", (req, res) => {
  res.send("Server Running!!");
});


app.use("/api/products",productsRoutes);
app.use("/api/carts",cartRoutes);

app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});