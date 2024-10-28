import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ThemePalette } from '@angular/material/core';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TransactionsService } from '../../shared/services/transactions.service';
import { Transaction } from '../../shared/models/transaction.model';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from '../../material.module';

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

export interface Fruit {
  name: string;
}

export interface Vegetable {
  name: string;
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.component.html',
  imports: [MaterialModule, TablerIconsModule, CommonModule],
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
