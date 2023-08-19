import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Package } from 'src/app/modules/packages/models/package';
import { PackagesService } from 'src/app/modules/packages/remote-services/packages.service';
import { Role } from 'src/app/modules/roles/models/role';
import { RolesService } from 'src/app/modules/roles/remote-services/roles.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  firstPageTitle: string = 'UsersManagementScreen.PrimaryTitle';
  coloredPageTitle: string = 'UsersManagementScreen.ColoredPrimaryTitle'
  secondPageTitle: string = 'UsersManagementScreen.SecondaryPageTitle';

  @ViewChild('updateModalCloseButtonRef') updateModalCloseButtonRef!: ElementRef;

  roles: Role[] = [];

  // page loading
  isLoading: boolean = false;

  // button loading
  isProcessing: boolean = false;

  createUserForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required])
  });

  updateUserForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required])
  });

  constructor(
    private toastr: ToastrService,
    private rolesService: RolesService,
    
  ) {


  }


  ngOnInit(): void {
    this.getRoles();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCreateButtonClick() {

  }

  onDeleteButtonClick(id: string) {

  }

  onUpdateButtonClick(id: string) {

  }


  getRoles() {
    let subscription = this.rolesService.getRoles().subscribe(
      (response: any) => {
        this.roles = response.data;
      }, (error: any) => {
        this.toastr.error(error.errors[0].value, error.error.message);
      }
    );

    this.subscription.add(subscription);
  }
}
