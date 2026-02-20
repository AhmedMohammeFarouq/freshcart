import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CheckPlateformService } from '../../../shared/services/check-plateform/check-plateform.service';
@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  translateService: TranslateService = inject(TranslateService);
  checkPlateformService: CheckPlateformService = inject(CheckPlateformService);

  constructor() {
    if (this.checkPlateformService.checkIsPlateformBrowser()) {
      let defaultlang: string = 'en';
      if (localStorage.getItem('lang') != null) {
        defaultlang = localStorage.getItem('lang')!;
      }
      this.translateService.setFallbackLang(defaultlang);
      this.translateService.use(defaultlang);
      this.changDirection(defaultlang);
    }
  }

  changLang(lang: string) {
    localStorage.setItem('lang', lang);

    this.translateService.setFallbackLang(lang);

    this.translateService.use(lang);

    this.changDirection(lang);
  }

  changDirection(lang: string) {
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
