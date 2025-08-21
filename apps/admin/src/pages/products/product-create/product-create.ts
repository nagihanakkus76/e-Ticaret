import { ChangeDetectionStrategy, Component, computed, inject, resource, signal, ViewEncapsulation } from '@angular/core';
import Blank from 'apps/admin/src/components/blank/blank';
import { BreadcrumbModel } from '../../layouts/breadcrumb/breadcrumb';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { NgxMaskDirective } from 'ngx-mask';
import { lastValueFrom } from 'rxjs';
import { initialProduct, ProductModel } from '../products';

@Component({
  imports: [Blank, FormsModule, NgxMaskDirective],
  templateUrl: './product-create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class ProductCreate {
  readonly id = signal<string | undefined>(undefined);
  readonly data = computed(() => this.result.value() ?? { ...initialProduct });
  readonly title = computed(() => this.id() ? 'Ürün Güncelle' : 'Ürün Ekle');
  readonly btnName = computed(() => this.id() ? 'Güncelle' : 'Kaydet');


  readonly breadcrumbs = signal<BreadcrumbModel[]>([
    { title: 'Ürünler', url: '/products', icon: 'deployed_code' }
  ]);

  readonly result = resource({
    params: () => this.id(),
    loader: async () => {
      var res = await lastValueFrom(
        this.#http.get<ProductModel>(`apiUrl/products/${this.id()}`)
      )
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
}
