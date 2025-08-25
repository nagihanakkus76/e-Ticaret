import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { FormsModule, NgForm } from '@angular/forms';
import { UserModel, initialUser } from '@shared/models/user.model'

@Component({
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Register {
  readonly data = signal<UserModel>(initialUser);

  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);
  readonly #router = inject(Router);

  signUp(form: NgForm) {
    if (!form.valid) {
      this.#toast.showToast("Tekrar Dene!", "Eksik ya da yanlış giriş yaptınız. Lütfen tekrar deneyin", "info")
      return;
    }

    this.data.update(prev => ({
      ...prev,
      fullName: `${prev.firstName} ${prev.lastName}`
    }));
    this.#http.post("apiUrl/users", this.data()).subscribe(() => {
      this.#toast.showToast("Başarılı", "Kaydınız başarıyla tamamlandı. Giriş yapabilirsiniz");
      this.#router.navigateByUrl("/auth/login");
    })
  }
}
