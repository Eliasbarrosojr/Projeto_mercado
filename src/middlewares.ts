import { NextFunction, Request, Response } from "express";
import { IProductRequest } from "./interfaces";
import { marketProd } from "./database";

const nameExist = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const name = request.body;

  if (Array.isArray(name)) {
    name.forEach((product: IProductRequest) => {
      marketProd.forEach((element) => {
        if (product.name == element.name) {
          return response.status(409).json({
            error: "Product already registered",
          });
        }
      });
    });
  } else {
    marketProd.forEach((element) => {
      if (name.name == element.name) {
        return response.status(409).json({
          error: "Product already registered",
        });
      }
    });
  }

  next();
};

const idExist = (request: Request, response: Response, next: NextFunction) => {
  const id = Number(request.params.id);

  const searchId = marketProd.findIndex((prod) => prod.id === id);

  if (searchId === -1) {
    return response.status(404).json({
      error: "Product not found",
    });
  }

  response.locals.id = {
    idProduct: id,
    searchedId: searchId,
  };

  next();
};

export { nameExist, idExist };
