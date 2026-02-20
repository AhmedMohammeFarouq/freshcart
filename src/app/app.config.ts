import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {provideTranslateService, TranslateService} from "@ngx-translate/core";
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";
import { addHeaderInterceptor } from './core/interceptor/addHeader/add-header.interceptor';
import { errorInterceptor } from './core/interceptor/error/error.interceptor';
import {NgxSpinnerModule} from 'ngx-spinner'
import { spinnerInterceptor } from './core/interceptor/spinner/spinner.interceptor';
import {provideAnimations} from '@angular/platform-browser/animations'
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([addHeaderInterceptor,errorInterceptor,spinnerInterceptor])),
     provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      })
    }),
    provideToastr(),
    provideAnimations(),
    importProvidersFrom(NgxSpinnerModule)
  ],
};
