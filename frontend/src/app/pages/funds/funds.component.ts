import { Component, signal } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FundsService } from '../../shared/services/funds.service';
import { Fund } from '../../shared/models/fund.model';
import { CommonModule } from '@angular/common';
import { SubscriptionsService } from '../../shared/services/subscriptions.service';
import { SubscribeUserDto } from '../../shared/dtos/subscription.dto';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { SubscriptionModalComponent } from './modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-funds',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, CommonModule],
  templateUrl: './funds.component.html',
})
export class AppFundsComponent {
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<SubscriptionModalComponent, any> | undefined;
  funds = signal<Fund[]>([]);
  constructor(
    private fundsService: FundsService,
    private subscriptionsService: SubscriptionsService,
    private matDialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fundsService.getFunds().subscribe({
      next: (funds) => {
        this.funds.set(funds);
      },
    });
  }

  openModal(fundId: string) {
    this.dialogConfig.id = 'modal-component';
    this.dialogConfig.height = '300px';
    this.dialogConfig.width = '500px';
    this.modalDialog = this.matDialog.open(
      SubscriptionModalComponent,
      this.dialogConfig
    );

    this.modalDialog.afterClosed().subscribe((amount: number) => {
      if (amount) {
        this.subscribeToFund(fundId, amount);
      }
    });
  }

  subscribeToFund(fundId: string, amount: number) {
    const payload: SubscribeUserDto = { amount, fund: fundId };

    console.log(fundId);
    this.subscriptionsService
      .subscribeToFund('671e6f4d59067cabbc071b5d', payload)
      .subscribe({
        next: () => {
          this.openSnackBar('Se ha suscrito exitosamente a este fondo');
        },
        error: (error) => {
          this.openSnackBar(error.error.message);
        },
      });
  }

  openSnackBar(message: string) {
    this.snackbar.open(message, 'Ok', {
      duration: 4000,
    });
  }
}
