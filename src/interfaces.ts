interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  calories?: number;
  section: "food" | "cleaning";
  expirationDate: Date;
}

interface IProductsBase {
  total: number;
  marketProducts: IProduct[];
}

type ICleaningProduct = IProduct;

interface IFoodProduct extends IProduct {
  calories: number;
}

type IProductRequest = Omit<IProduct, "id" | "expirationDate">;

type IMarket = IProduct[];

export {
  IProduct,
  ICleaningProduct,
  IFoodProduct,
  IProductRequest,
  IProductsBase,
  IMarket,
};
