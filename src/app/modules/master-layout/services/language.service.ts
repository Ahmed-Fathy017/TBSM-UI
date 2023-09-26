// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LanguageService {

//   private readonly languageKey = 'lang';

//   private appLanguage$: BehaviorSubject<string> = new BehaviorSubject<string>(sessionStorage.getItem(this.languageKey)!);


//   constructor() {
//     sessionStorage.getItem(sessionStorage.getItem(this.languageKey)!)
//   }

//   getAppLanguage(): Observable<string> {
//     return this.appLanguage$.asObservable();
//   }

//   setAppLanguage(newState: string) {
//     sessionStorage.setItem(this.languageKey, newState)
//     //this.appLanguage$.next(newState);

//   }
// }
