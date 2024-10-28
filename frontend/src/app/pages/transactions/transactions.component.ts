import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TransactionsService } from '../../shared/services/transactions.service';
import {
  Transaction,
  TransactionQueryParams,
} from '../../shared/models/transaction.model';
import { MaterialModule } from '../../material.module';
import { PageEvent } from '@angular/material/paginator';

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
  currentPage = 0;
  transactionsCount= 100;

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit() {
    this.transactionsService.getTransactions().subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
      },
    });
  }

  handlePageEvent(event: PageEvent) {
    console.log(event.pageIndex, event.pageSize);
    const params: TransactionQueryParams = {
      limit: event.pageSize,
      offset: event.pageSize * event.pageIndex,
    };

    this.transactionsService.getTransactions(params).subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
      },
    });
  }
}
