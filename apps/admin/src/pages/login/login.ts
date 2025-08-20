import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import Blank from '../../components/blank/blank';

@Component({
  imports: [Blank],
  templateUrl: './login.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Login {

}
