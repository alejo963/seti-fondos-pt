import { Routes } from '@angular/router';
import { AppSubscriptionsComponent } from './subscriptions/subscriptions.component';
import { AppTransactionsComponent } from './transactions/transactions.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
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
