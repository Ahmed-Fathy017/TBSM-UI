import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingDotsComponent } from './components/loading-dots/loading-dots.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    LoadingButtonComponent,
    LoadingComponent,
    LoadingDotsComponent,
    PageHeaderComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added,
    TranslateModule 
  ],
  exports : [
    LoadingButtonComponent,
    LoadingComponent,
    LoadingDotsComponent,
    PageHeaderComponent
  ]
})
export class SharedComponentsModule { }
