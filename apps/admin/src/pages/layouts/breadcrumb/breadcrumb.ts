import { ChangeDetectionStrategy, Component, computed, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Common } from 'apps/admin/src/services/common';

export interface BreadcrumbModel {
  title: string,
  url: string,
  icon: string
}
@Component({
  selector: 'app-breakcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Breadcrumb {
  readonly data = computed(() => this.common.data())

  constructor(private common: Common) { }
}
