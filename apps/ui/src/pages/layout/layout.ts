import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CategoryModel } from '@shared/models/category.model'
@Component({
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Layout {
  readonly result = httpResource<CategoryModel[]>(() => "apiUrl/categories");
  readonly data = computed(() => this.result.value() ?? []);
}
