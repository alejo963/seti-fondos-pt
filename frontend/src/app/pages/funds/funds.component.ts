import { Component, signal } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FundsService } from '../../shared/services/funds.service';
import { Fund } from '../../shared/models/fund.model';
import { CommonModule } from '@angular/common';
import { SubscriptionsService } from '../../shared/services/subscriptions.service';
import { SubscribeUserDto } from '../../shared/dtos/subscription.dto';

@Component({
  selector: 'app-funds',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, CommonModule],
  templateUrl: './funds.component.html',
})
export class AppFundsComponent {
  funds = signal<Fund[]>([]);
  constructor(
    private fundsService: FundsService,
    private subscriptionsService: SubscriptionsService
  ) {}

  ngOnInit() {
    this.fundsService.getFunds().subscribe({
      next: (funds) => {
        this.funds.set(funds);
      },
    });
  }

  subscribeToFund(fundId: string) {
    const payload: SubscribeUserDto = { amount: 125000, fund: fundId };
    this.subscriptionsService.subscribeToFund(
      '671e6f4d59067cabbc071b5d',
      payload
    ).subscribe({
      next: (response) => {
        
      }
    });
  }
}
