import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'suscripciones',
        component: AppBadgeComponent,
      },
      {
        path: 'transacciones',
        component: AppChipsComponent,
      },
    ],
  },
];
