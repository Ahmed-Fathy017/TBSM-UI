import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly languageKey = 'lang';

  private appLanguage$: BehaviorSubject<string> = new BehaviorSubject<string>(sessionStorage.setItem(this.languageKey, sessionStorage.getItem(this.languageKey) || 'ar')!);


  constructor() { }

  getAppLanguage(): Observable<string> {
    return this.appLanguage$.asObservable();
  }

  setAppLanguage(newState: string) {
    this.appLanguage$.next(newState);
  }
}
