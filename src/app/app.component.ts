import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalService } from './modules/shared-components/services/local.service';
// import { LanguageService } from './modules/master-layout/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TBSM';

  translationsLoaded = false;
  lang: string = '';

  constructor(
    private translateService: TranslateService) {
    this.translateService.setDefaultLang('ar');
    // this.languageService.setAppLanguage('en'); 
    this.translateService.use(sessionStorage.getItem('lang')!).subscribe(() => {
      this.translationsLoaded = true;
    });
    
  }

  ngOnInit(): void {
    // this.languageService.getAppLanguage().subscribe((state) => {
    //   this.translationsLoaded = false;
    //   this.lang = state;
    //   alert()

    
    // });
  }

  translate(event: any) {
    this.translateService.use(event.target.value)
  }
}
