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

registerLocaleData(LocaleTr)

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    {provide:LOCALE_ID, useValue:'tr'}
  ],
};
