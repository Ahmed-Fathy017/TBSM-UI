import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingDotsComponent } from './components/loading-dots/loading-dots.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { SharedMessagesComponent } from './components/shared-messages/shared-messages.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { LocalService } from './services/local.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoadingButtonComponent,
    LoadingComponent,
    LoadingDotsComponent,
    PageHeaderComponent,
    SharedMessagesComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    RouterModule
  ],
  exports : [
    LoadingButtonComponent,
    LoadingComponent,
    LoadingDotsComponent,
    PageHeaderComponent,
    SharedMessagesComponent
  ]
})
export class SharedComponentsModule { }
