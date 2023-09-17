import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/authentication/screens/login/login.component';
import { ScreensConfigProvider } from './modules/master-layout/providers/screens-config-provider';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  RouterModule.forRoot([
    //Register public routes (doesn't require login)
    { path: '', redirectTo: '/login', pathMatch: 'full',  data: { config: ScreensConfigProvider.LoginScreen } },
    { path: 'login', component: LoginComponent,  data: { config: ScreensConfigProvider.LoginScreen } },

    // Register the secured routes in the master-layout module (requires login)
    {
      path: '',
      loadChildren: () => import('../app/modules/master-layout/master-layout-routing.module').then(m => m.MasterLayoutRoutingModule)
    },
  ]),],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
