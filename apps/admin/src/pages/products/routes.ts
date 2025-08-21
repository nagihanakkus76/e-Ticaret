import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import("./products")
  },
  {
    path: 'create',
    loadComponent: () => import("./product-create/product-create")
  },
  {
    path: 'edit/:id',
    loadComponent: () => import("./product-create/product-create")
  }
]

export default routes;
