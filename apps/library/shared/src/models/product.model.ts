import { v4 as uuidv4 } from 'uuid';
export interface ProductModel {
  id: string,
  name: string,
  imageUrl: string
  price: number,
  stock: number,
  categoryId: string,
  categoryName: string,
  categoryUrl: string
}

export const initialProduct: ProductModel = {
  id: uuidv4(),
  name: "",
  imageUrl: "",
  price: 0,
  stock: 0,
  categoryId: "",
  categoryName: "",
  categoryUrl:""
}
