import { v4 as uuidv4 } from 'uuid';
export interface CategoryModel {
  id: string,
  name: string,
  url: string
}

export const initialCategory: CategoryModel = {
  id: uuidv4(),
  name: "",
  url: ""
}


