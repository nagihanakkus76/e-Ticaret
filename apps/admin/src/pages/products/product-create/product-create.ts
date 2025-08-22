import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, resource, signal, ViewEncapsulation } from '@angular/core';
import Blank from 'apps/admin/src/components/blank/blank';
import { BreadcrumbModel } from '../../layouts/breadcrumb/breadcrumb';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, httpResource } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { NgxMaskDirective } from 'ngx-mask';
import { lastValueFrom } from 'rxjs';
import { initialProduct, ProductModel } from '../products';
import { CategoryModel } from '../../categories/categories';
import { FlexiSelectModule } from 'flexi-select';

@Component({
  imports: [Blank, FormsModule, NgxMaskDirective, FlexiSelectModule],
  templateUrl: './product-create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class ProductCreate {
  readonly id = signal<string | undefined>(undefined);
  readonly data = linkedSignal(() => this.result.value() ?? { ...initialProduct });
  readonly title = computed(() => this.id() ? 'Ürün Güncelle' : 'Ürün Ekle');
  readonly btnName = computed(() => this.id() ? 'Güncelle' : 'Kaydet');

  readonly breadcrumbs = signal<BreadcrumbModel[]>([{ title: 'Ürünler', url: '/products', icon: 'deployed_code' }]);

  readonly categoryResult = httpResource<CategoryModel[]>(() => 'apiUrl/categories')
  readonly categories = computed(() => this.categoryResult.value() ?? [])
  readonly categoryLoading = computed(() => this.categoryResult.isLoading())

  readonly result = resource({
    params: () => this.id(),
    loader: async () => {
      var res = await lastValueFrom(
        this.#http.get<ProductModel>(`apiUrl/products/${this.id()}`)
      )
       this.breadcrumbs.update(prev => [...prev,
          {title: res.name, url: `/products/edit/${this.id()}`, icon: 'edit_document'}]);
      return res;
    }
  });

  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);
  readonly #toast = inject(FlexiToastService);
  readonly #activate = inject(ActivatedRoute);

  constructor() {
    this.#activate.params.subscribe(res => {
      if (res["id"]) {
        this.id.set(res["id"]);
      }else{
        this.breadcrumbs.update(prev => [...prev,
          {title: 'Ekle', url: '/products/create', icon: 'add'}])
      }
    })
  }

  save(form: NgForm) {
    if (!form.valid) return;

    if (!this.id()) {
      this.#http.post("apiUrl/products", this.data()).subscribe(() => {
        this.#router.navigateByUrl("/products");
        this.#toast.showToast("Başarılı", "Ürün başarıyla eklendi", "success");
      });
    }
    else {
      this.#http.put(`apiUrl/products/${this.id()}`, this.data()).subscribe(() => {
        this.#router.navigateByUrl("/products");
        this.#toast.showToast("Başarılı", "Ürün başarıyla güncellendi", "info");
      });
    }
  }

  setCategoryName() {
    const id = this.data().categoryId
    const category = this.categories().find(p => p.id == id)
    this.data.update((prev) => ({ ...prev, categoryName: category?.name ?? "" }))
  }
}
