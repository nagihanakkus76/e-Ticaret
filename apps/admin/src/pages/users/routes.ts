import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./users')
  },
  {
    path: 'create',
    loadComponent: () => import('./user-create/user-create')
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./user-create/user-create')
  },
]

export default routes;
