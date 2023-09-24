import { Component } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';
import { UserTypes } from 'src/app/modules/authentication/models/user-types';


@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  constructor(private localService: LocalService,
    private router: Router) {

  }

  onClick() {
    if (this.localService.getData('type') == UserTypes.ADMIN)
      this.router.navigate(['dashboard'])
    else
      this.router.navigate(['warehouses/home'])
  }
}
