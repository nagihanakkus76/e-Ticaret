import { HttpClient, httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank/blank';
import { FlexiGridModule } from 'flexi-grid';
import { BreadcrumbModel } from '../layouts/breadcrumb/breadcrumb';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { FormsModule } from '@angular/forms';

export interface UserModel {
  id?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export const initialUser: UserModel = {
  id: crypto.randomUUID(),
  firstName: "",
  lastName: "",
  fullName: "",
  userName: "",
  email: "",
  password: "",
  isAdmin: false,
}

@Component({
  imports: [Blank, FlexiGridModule, RouterLink, FormsModule],
  templateUrl: './users.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Users {
  readonly result = httpResource<UserModel[]>(() => "apiUrl/users")
  readonly data = computed(() => this.result.value() ?? [])
  readonly loading = computed(() => this.result.isLoading())
  readonly breadcrumb = signal<BreadcrumbModel[]>([{ title: "Kullanıcılar", url: "/users", icon: "group" }])


  readonly #toast = inject(FlexiToastService)
  readonly #http = inject(HttpClient)

  delete(id: string) {
    this.#toast.showSwal("Kullanıcı Silinecek!", "Kullanıcıyı silmek istiyor musunuz?", "Sil", () => {
      this.#http.delete(`apiUrl/users/${id}`).subscribe(res => {
        this.result.reload()
      })
    })
  }

  changeIsAdmin(data: UserModel) {
    this.#http.put(`apiUrl/users/${data.id}`, data).subscribe(() => {
      this.result.reload();
    });
  }
}
