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

  constructor(
    private translateService: TranslateService,
    private localService: LocalService) {
    this.translateService.setDefaultLang('ar');
    this.translateService.use(localService.getData('lang') || 'ar').subscribe(() => {
      this.translationsLoaded = true;
    });;
    this.localService.saveData('lang', localService.getData('lang') || 'ar');
  }

  translate(event: any) {
    this.translateService.use(event.target.value)
  }
}
