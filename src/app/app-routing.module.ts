import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/authentication/screens/login/login.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  RouterModule.forRoot([
    //Register public routes (doesn't require login)
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    // Register the secured routes in the master-layout module (requires login)
    {
      path: 'entry',
      loadChildren: () => import('../app/modules/master-layout/master-layout-routing.module').then(m => m.MasterLayoutRoutingModule)
    },
  ]),],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
