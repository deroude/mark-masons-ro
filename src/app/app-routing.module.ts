import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '@services/auth';

const routes: Routes = [
  { path:"", loadChildren: () => import('./components/public/public.module').then(m => m.PublicModule) },
  { path:"order-admin", loadChildren: () => import('./components/order-admin/order-admin.module').then(m => m.OrderAdminModule), canActivate: [AuthService] },
  { path:"lodge-admin", loadChildren: () => import('./components/lodge-admin/lodge-admin.module').then(m => m.LodgeAdminModule), canActivate: [AuthService] },
  { path: 'regular-user', loadChildren: () => import('./components/regular-user/regular-user.module').then(m => m.RegularUserModule), canActivate: [AuthService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
