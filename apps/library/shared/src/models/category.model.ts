export interface CategoryModel {
  id: string,
  name: string,
  url: string
}

export const initialCategory: CategoryModel = {
  id: crypto.randomUUID(),
  name: "",
  url: ""
}
