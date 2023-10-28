import { Component } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';
import { UserTypes } from 'src/app/modules/authentication/models/user-types';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {

  constructor(private localService: LocalService,
    private router: Router) {

  }

  onClick() {
    // if (this.localService.getData('type') == UserTypes.ADMIN)
      this.router.navigate(['dashboard'])
    // else
    //   this.router.navigate(['warehouses/home'])
  }
}
