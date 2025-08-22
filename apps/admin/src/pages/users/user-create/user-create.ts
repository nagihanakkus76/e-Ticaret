import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, resource, signal, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { lastValueFrom } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import Blank from 'apps/admin/src/components/blank/blank';
import { BreadcrumbModel } from '../../layouts/breadcrumb/breadcrumb';
import { UserModel, initialUser } from '@shared/models/user.model';
@Component({
  imports: [Blank, FormsModule],
  templateUrl: './user-create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UserCreate {
  readonly id = signal<string | undefined>(undefined);
  readonly data = linkedSignal(() => this.result.value() ?? { ...initialUser })
  readonly title = computed(() => this.id() ? "Kullanıcı Güncelle" : "Kullanıcı Ekle")
  readonly btnName = computed(() => this.id() ? "Güncelle" : "Kaydet")

  readonly breadcrumbs = signal<BreadcrumbModel[]>([{title: 'Kullanıcılar', url: '/users', icon: 'group'}])

  readonly #http = inject(HttpClient);
  readonly #activate = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #toast = inject(FlexiToastService);

  readonly result = resource({
    params: () => this.id(),
    loader: async () => {
      var res = await lastValueFrom(this.#http.get<UserModel>(`apiUrl/users/${this.id()}`));
       this.breadcrumbs.update(prev => [...prev,
          {title: res.fullName, url: `/users/edit/${this.id()}`, icon: 'edit_document'},]);
      return res;
    }
  });

  constructor() {
    this.#activate.params.subscribe(res => {
      if (res["id"]) {
        this.id.set(res["id"]);
      }else{
        this.breadcrumbs.update(prev => [...prev,
          {title: 'Ekle', url: '/users/create', icon: 'add'},])
      }
    })
  }


  save(form: NgForm) {
    if (!form.valid) return;
    this.data.update((prev) =>
      ({ ...prev, fullName: `${prev.firstName} ${prev.lastName}` }));

    if (!this.id()) {
      this.#http.post("apiUrl/users", this.data()).subscribe(() => {
        this.#router.navigateByUrl("/users")
        this.#toast.showToast("Başarılı", "Kullanıcı başarıyla eklendi", "success")
      })
    }
    else {
      this.#http.put(`apiUrl/users/${this.id()}`, this.data()).subscribe(() => {
        this.#router.navigateByUrl("/users")
        this.#toast.showToast("Başarılı", "Kullanıcı başarıyla güncellendi", "info")
      })
    }
  }
}
