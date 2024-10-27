import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SubscriptionsService } from '../../shared/services/subscriptions.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { Subscription } from '../../shared/models/subscription.model';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, CommonModule],
})
export class AppSubscriptionsComponent implements OnInit {
  constructor(private subscriptionsService: SubscriptionsService) {}
  subscriptions = signal<Subscription[]>([]);
  ngOnInit(): void {
    this.subscriptionsService
      .getSubscriptions('671e6f4d59067cabbc071b5d')
      .subscribe({
        next: (subscriptions) => {
          this.subscriptions.set(subscriptions);
        },
      });
  }

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
