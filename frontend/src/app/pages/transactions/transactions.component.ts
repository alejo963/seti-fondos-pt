import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TransactionsService } from '../../shared/services/transactions.service';
import { Transaction } from '../../shared/models/transaction.model';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.component.html',
  imports: [MaterialModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTransactionsComponent {
  transactions = signal<Transaction[]>([]);
  displayedColumns: string[] = ['type', 'amount', 'user', 'fund', 'createdAt'];

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit() {
    this.transactionsService.getTransactions().subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
      },
    });
  }
}
