import { Component, signal } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FundsService } from '../../shared/services/funds.service';
import { Fund } from '../../shared/models/fund.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-funds',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, CommonModule],
  templateUrl: './funds.component.html',
})
export class AppFundsComponent {
  funds = signal<Fund[]>([]);
  constructor(private fundsService: FundsService) {}

  ngOnInit() {
    this.fundsService.getFunds().subscribe({
      next: (funds) => {
        this.funds.set(funds);
      },
    });
  }
}
