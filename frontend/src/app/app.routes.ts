import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full.component';
import { AppSubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { AppTransactionsComponent } from './pages/transactions/transactions.component';
import { AppFundsComponent } from './pages/funds/funds.component';
import { AppUserComponent } from './pages/user/user.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/fondos',
        pathMatch: 'full',
      },
      {
        path: 'usuario',
        component: AppUserComponent
      },
      {
        path: 'fondos',
        component: AppFundsComponent,
      },
      {
        path: 'suscripciones',
        component: AppSubscriptionsComponent,
      },
      {
        path: 'transacciones',
        component: AppTransactionsComponent,
      },
    ],
  },
];
