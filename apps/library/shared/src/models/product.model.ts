export interface ProductModel {
  id: string,
  name: string,
  imageUrl: string
  price: number,
  stock: number,
  categoryId: string,
  categoryName: string
}

export const initialProduct: ProductModel = {
  id: crypto.randomUUID(),
  name: "",
  imageUrl: "",
  price: 0,
  stock: 0,
  categoryId: "123",
  categoryName: "Telefon"
}
