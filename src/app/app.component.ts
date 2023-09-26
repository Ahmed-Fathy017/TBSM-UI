import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalService } from './modules/shared-components/services/local.service';
import { LanguageService } from './modules/master-layout/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TBSM';

  translationsLoaded = false;
  lang: string = '';

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService) {
    this.translateService.setDefaultLang('ar');
    this.languageService.setAppLanguage('ar'); 

    this.languageService.getAppLanguage().subscribe((state) => {
      this.translationsLoaded = false;
      this.lang = state;

      this.translateService.use(state).subscribe(() => {
        this.translationsLoaded = true;
      });
    });
  }

  translate(event: any) {
    this.translateService.use(event.target.value)
  }
}
