import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guard/authentication.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'welcome',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationPageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'view-credit-card',
    loadChildren: () => import('./tab-profile/credit-card/view-credit-card/view-credit-card.module').then(m => m.ViewCreditCardPageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'create-credit-card',
    loadChildren: () => import('./tab-profile/credit-card/create-credit-card/create-credit-card.module').then(m => m.CreateCreditCardPageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderPageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'payment-transaction',
    loadChildren: () => import('./payment-transaction/payment-transaction.module').then(m => m.PaymentTransactionPageModule),
    canActivate: [AuthenticationGuard]
  }

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
