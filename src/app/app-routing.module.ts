import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/authentication/screens/login/login.component';
import { ScreensConfigProvider } from './modules/master-layout/providers/screens-config-provider';
import { PageNotFoundComponent } from './modules/shared-components/components/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './modules/shared-components/components/unauthorized/unauthorized.component';
import { ProductPrintComponent } from './modules/shared-components/components/product-print/product-print.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  RouterModule.forRoot([
    //Register public routes (doesn't require login)
    { path: '', redirectTo: '/login', pathMatch: 'full', data: { config: ScreensConfigProvider.LoginScreen } },
    { path: 'login', component: LoginComponent, data: { config: ScreensConfigProvider.LoginScreen } },
    { path: 'product/print', component: ProductPrintComponent, data: { config: ScreensConfigProvider.ProductPrintScreen } },

    // Register the secured routes in the master-layout module (requires login)
    {
      path: '',
      loadChildren: () => import('../app/modules/master-layout/master-layout-routing.module').then(m => m.MasterLayoutRoutingModule)
    },
    //Unauthorized Route for 403 request
    {
      path: 'unauthorized', pathMatch: 'full',
      component: UnauthorizedComponent
    },
    //Wild Card Route for 404 request
    {
      path: '**', pathMatch: 'full',
      component: PageNotFoundComponent
    },

    
  ]),],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
