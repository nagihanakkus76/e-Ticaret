import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import LocaleTr from '@angular/common/locales/tr'
import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask';
import { endpointInterceptor } from '@shared/interceptors/endpoint-interceptor';
import { errorInterceptor } from '@shared/interceptors/error-interceptor';

registerLocaleData(LocaleTr)

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([endpointInterceptor,errorInterceptor])),
    provideNgxMask(),
    { provide: LOCALE_ID, useValue: 'tr' }
  ],
};
