import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, resource, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import Blank from 'apps/admin/src/components/blank/blank';
import { lastValueFrom } from 'rxjs';
import { CategoryModel, initialCategory } from '../categories';
import { HttpClient } from '@angular/common/http';
import { FlexiToastService } from 'flexi-toast';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbModel } from '../../layouts/breadcrumb/breadcrumb';

@Component({
  imports: [Blank, FormsModule],
  templateUrl: './category-create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CategoryCreate {
  readonly data = linkedSignal(() => this.result.value() ?? { ...initialCategory })
  readonly id = signal<string | undefined>(undefined)
  readonly title = computed(() => this.id() ? "Kategori Güncelle" : "Kategori Ekle")
  readonly btnName = computed(() => this.id() ? "Güncelle" : "Kaydet")

  readonly breadcrumbs = signal<BreadcrumbModel[]>([{ title: 'Kategoriler', url: '/categories', icon: 'category'}])

  readonly #http = inject(HttpClient)
  readonly #router = inject(Router)
  readonly #toast = inject(FlexiToastService)
  readonly #activate = inject(ActivatedRoute)


  constructor() {
    this.#activate.params.subscribe(res => {
      if (res["id"]) {
        this.id.set(res["id"]);
      } else {
        this.breadcrumbs.update(prev => [...prev,
        { title: 'Ekle', url: '/categories/create', icon: 'add'},])
      }
    })
  }

  readonly result = resource({
    params: () => this.id(),
    loader: async () => {
      var res = await lastValueFrom(
        this.#http.get<CategoryModel>(`apiUrl/categories/${this.id()}`)
      )
      this.breadcrumbs.update(prev => [...prev,
      { title: res.name, url: `/categories/edit/${this.id()}`, icon: 'edit_document'}])
      return res;
    }
  })

  save(form: NgForm) {
    if (!form.valid) return;

    if (!this.id()) {
      this.#http.post("apiUrl/categories", this.data()).subscribe(() => {
        this.#router.navigateByUrl("/categories")
        this.#toast.showToast("Başarılı", "Kategori başarıyla eklendi", "success")
      })
    }
    else {
      this.#http.put(`apiUrl/categories/${this.id()}`, this.data()).subscribe(() => {
        this.#router.navigateByUrl("/categories")
        this.#toast.showToast("Başarılı", "Kategori başarıyla güncellendi", "info")
      })
    }
  }
}
