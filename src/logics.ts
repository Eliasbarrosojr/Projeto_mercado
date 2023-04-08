import { Request, Response } from "express";
import { marketProd, Products } from "./database";
import { IProduct, IProductRequest, IProductsBase } from "./interfaces";

const createProduct = (request: Request, response: Response): Response => {
  const productDate: Array<IProductRequest> = request.body;

  const productsCreated: IProduct[] = [];

  productDate.map((product: IProductRequest) => {
    const newProduct = {
      id: marketProd.length + 1,
      ...product,
      expirationDate: new Date(),
    };
    marketProd.push(newProduct);
    productsCreated.push(newProduct);
    return newProduct;
  });

  const newArray: IProductsBase = {
    total: marketProd.reduce((acc, product) => {
      return product.price + acc;
    }, 0),
    marketProducts: productsCreated,
  };

  Products.push(newArray);

  return response.status(201).json(newArray);
};

const searchAllProducts = (request: Request, response: Response): Response => {
  const newObj: IProductsBase = {
    total: marketProd.reduce((acc, product) => {
      return product.price + acc;
    }, 0),
    marketProducts: marketProd,
  };

  return response.json(newObj);
};

const searchById = (request: Request, response: Response): Response => {
  return response.status(200).json(marketProd[response.locals.id.searchedId]);
};

const deleteProduct = (request: Request, response: Response): Response => {
  marketProd.splice(response.locals.id.searchedId, 1);

  return response.status(204).send();
};

const Update = (request: Request, response: Response): Response => {
  const id = response.locals.id.idProduct;
  const index = response.locals.id.searchedId;

  const newData = request.body;

  marketProd.map((prod) => {
    const actualProduct = prod;
    if (prod.id == id) {
      const UpdatedProduct = {
        ...actualProduct,
        ...newData,
      };

      marketProd[index] = UpdatedProduct;
      return UpdatedProduct;
    }
  });

  return response.status(200).json(marketProd[index]);
};

export { createProduct, Update, deleteProduct, searchAllProducts, searchById };
