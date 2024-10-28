import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SubscriptionsService } from '../../shared/services/subscriptions.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { Subscription } from '../../shared/models/subscription.model';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { CancelSubscriptionModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, CommonModule],
})
export class AppSubscriptionsComponent implements OnInit {
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<CancelSubscriptionModalComponent, any> | undefined;
  constructor(
    private subscriptionsService: SubscriptionsService,
    public matDialog: MatDialog
  ) {}
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

  openModal(subscriptionId: string) {
    this.dialogConfig.id = 'cancel-modal-component';
    this.dialogConfig.height = '300px';
    this.dialogConfig.width = '500px';
    this.modalDialog = this.matDialog.open(
      CancelSubscriptionModalComponent,
      this.dialogConfig
    );

    this.modalDialog.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.subscriptionsService
          .cancelSubscription('671e6f4d59067cabbc071b5d', subscriptionId)
          .subscribe({
            next: () => {
              window.location.reload();
            },
          });
      }
    });
  }
}
