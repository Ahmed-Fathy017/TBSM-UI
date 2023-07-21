import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/authentication/screens/login/login.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot([
      {path: '', component: LoginComponent}
    ]),],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
