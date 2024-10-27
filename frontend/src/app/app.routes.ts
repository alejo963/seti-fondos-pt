import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full.component';
import { StarterComponent } from './pages/starter/starter.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

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
        path: 'fondos',
        component: StarterComponent,
      },
      {
        path: 'suscripciones',
        component: SubscriptionsComponent,
      },
      {
        path: 'transacciones',
        component: TransactionsComponent,
      }
    ],
  },
];
