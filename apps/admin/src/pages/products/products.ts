import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank/blank';
import { BreadcrumbModel } from '../layouts/breadcrumb/breadcrumb';
import { FlexiGridFilterDataModel, FlexiGridModule } from 'flexi-grid';
import { HttpClient, httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';

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

@Component({
  imports: [Blank, FlexiGridModule, RouterLink],
  templateUrl: './products.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Products {
  readonly result = httpResource<ProductModel[]>(() => "apiUrl/products")

  readonly breadcrumbs = signal<BreadcrumbModel[]>([{ title: "Ürünler", url: "/products", icon: "deployed_code" }])
  readonly datas = computed(() => this.result.value() ?? [])
  readonly loading = computed(() => this.result.isLoading())

  readonly #toast = inject(FlexiToastService)
  readonly #http = inject(HttpClient)

  readonly categoryFilter = signal<FlexiGridFilterDataModel[]>([
    {
      name: "Telefon",
      value: "Telefon"
    }
  ])

  delete(id: string) {
    this.#toast.showSwal("Ürünü Silinecek!", "Ürünü silmek istiyor musunuz?", "Sil", () => {
      this.#http.delete(`apiUrl/products/${id}`).subscribe(res => {
        this.result.reload()
      })
    })
  }
}
