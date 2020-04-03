import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab-menu',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab-menu/tab-menu.module').then(m => m.TabMenuPageModule)
          }
        ]
      },
      {
        path: 'tab-queue',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab-queue/tab-queue.module').then(m => m.TabQueuePageModule)
          }
        ]
      },
      {
        path: 'tab-order',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab-order/tab-order.module').then(m => m.TabOrderPageModule)
          }
        ]
      },
      {
        path: 'tab-cart',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab-cart/tab-cart.module').then(m => m.TabCartPageModule)
          }
        ]
      },
      {
        path: 'tab-profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab-profile/tab-profile.module').then(m => m.TabProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab-menu',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab-menu',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
