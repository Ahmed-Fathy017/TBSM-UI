import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalService } from './modules/shared-components/services/local.service';

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
    private localService: LocalService) {
    this.translateService.setDefaultLang('ar');
    this.translateService.use(localService.getData('lang') || 'ar').subscribe(() => {
      this.localService.saveData('lang', localService.getData('lang') || 'ar');
      this.lang = this.localService.getData('lang')
      this.translationsLoaded = true;
    });;
  }

  translate(event: any) {
    this.translateService.use(event.target.value)
  }
}
