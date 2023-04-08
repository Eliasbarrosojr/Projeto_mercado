import express, { Application, json } from "express";
/* import {
  createProduct,
  deleteProduct,
  searchAllProducts,
  searchById,
  Update,
} from "./logics";
import { idExist, nameExist } from "./Middlewares"; */

const app: Application = express();
app.use(json());

/* app.post("/products", nameExist, createProduct);
app.get("/products", searchAllProducts);
app.get("/products/:id", idExist, searchById);
app.patch("/products/:id", idExist, nameExist, Update);
app.delete("/products/:id", idExist, deleteProduct); */

app.listen(3000, () => {
  console.log("Server is running");
});
