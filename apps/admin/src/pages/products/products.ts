import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank/blank';
import { BreadcrumbModel } from '../layouts/breadcrumb/breadcrumb';
import { FlexiGridFilterDataModel, FlexiGridModule } from 'flexi-grid';
import { HttpClient, httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { ProductModel } from '@shared/models/product.model';
import { CategoryModel } from '@shared/models/category.model';
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

  readonly categoryResult = httpResource<CategoryModel[]>(() => 'apiUrl/categories')

  readonly #toast = inject(FlexiToastService)
  readonly #http = inject(HttpClient)

  readonly categoryFilter = computed<FlexiGridFilterDataModel[]>(() => {
    const categories = this.categoryResult.value() ?? []
    return categories.map<FlexiGridFilterDataModel>((val) => ({ name: val.name, value: val.name }));
  })

  delete(id: string) {
    this.#toast.showSwal("Ürünü Silinecek!", "Ürünü silmek istiyor musunuz?", "Sil", () => {
      this.#http.delete(`apiUrl/products/${id}`).subscribe(res => {
        this.result.reload()
      })
    })
  }
}
