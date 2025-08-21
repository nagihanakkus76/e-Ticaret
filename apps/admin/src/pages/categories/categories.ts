import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank/blank';
import { BreadcrumbModel } from '../layouts/breadcrumb/breadcrumb';
import { FlexiGridModule } from 'flexi-grid';
import { HttpClient, httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';

export interface CategoryModel {
  id: string,
  name: string
}

export const initialCategory: CategoryModel = {
  id: crypto.randomUUID(),
  name: ""
}

@Component({
  imports: [Blank, FlexiGridModule, RouterLink],
  templateUrl: './categories.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class Categories {

  readonly result = httpResource<CategoryModel[]>(() => "apiUrl/categories")
  readonly breadcrumbs = signal<BreadcrumbModel[]>([{ title: "Kategoriler", url: "/categories", icon: "category" }])
  readonly datas = computed(() => this.result.value() ?? [])
  readonly loading = computed(() => this.result.isLoading())

  readonly #toast = inject(FlexiToastService)
  readonly #http = inject(HttpClient)

  delete(id: string) {
    this.#toast.showSwal("Kategori Silinecek!", "Kategoriyi silmek istiyor musunuz?", "Sil", () => {
      this.#http.delete(`apiUrl/categories/${id}`).subscribe(res => {
        this.result.reload()
      })
    })
  }
}
