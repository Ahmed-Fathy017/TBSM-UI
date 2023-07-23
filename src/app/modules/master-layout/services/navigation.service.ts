import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService implements OnInit {

  private showNav$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    // here any navigation events (i.e. clicking on the nav items to go to a separate page)
    // will be captured inside this subscription, then we hide the nav by setting
    // the showNav$ to false or in our case, calling the setShowNav to false, which does the same
    router.events.subscribe(() => {
      this.setShowNav(false);
    });
   }

  ngOnInit() {
  }

  getShowNav(){
    return this.showNav$.asObservable();
  }

  setShowNav(showHide: boolean) {
    this.showNav$.next(showHide);
  }

  toggleNavState() {
    this.showNav$.next(!this.showNav$.value);
  }

  isNavOpen() {
    return this.showNav$.value;
  }
}