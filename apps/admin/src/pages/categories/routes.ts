import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('./categories')
  },
  {
    path: "create",
    loadComponent: () => import('./category-create/category-create')
  },
  {
    path: "edit/:id",
    loadComponent: () => import('./category-create/category-create')
  }
]

export default routes;
