import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guard/authentication.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'welcome',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule),
    canActivate: [AuthenticationGuard]
  },  {
    path: 'tab-order',
    loadChildren: () => import('./tab-order/tab-order.module').then( m => m.TabOrderPageModule)
  },
  {
    path: 'tab-menu',
    loadChildren: () => import('./tab-menu/tab-menu.module').then( m => m.TabMenuPageModule)
  },
  {
    path: 'tab-profile',
    loadChildren: () => import('./tab-profile/tab-profile.module').then( m => m.TabProfilePageModule)
  },
  {
    path: 'tab-cart',
    loadChildren: () => import('./tab-cart/tab-cart.module').then( m => m.TabCartPageModule)
  }




];

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'login',
//     pathMatch: 'full'
//   },  
//   { path: 'login', loadChildren: './auth/login.module#LoginPageModule', canActivate: [AuthenticationGuard]  },
//   { path: 'register', loadChildren: './auth/register.module#RegisterPageModule', canActivate: [AuthenticationGuard]  },
//   { path: 'welcome', loadChildren: './tabs/tab.module#TabsPageModule', canActivate: [AuthenticationGuard] },
//   { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthenticationGuard] },
//  ];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
