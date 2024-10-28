import { Component, OnInit, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../material.module';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './modal.component.html',
})
export class SubscriptionModalComponent implements OnInit {
  isAmount = signal<boolean>(true);
  amountFormControl = new FormControl('amount', [
    Validators.required,
    Validators.min(0),
  ]);
  constructor(public dialogRef: MatDialogRef<SubscriptionModalComponent>) {}

  ngOnInit(): void {}

  closeModal() {
    this.dialogRef.close();
  }

  closeAndSend() {
    this.dialogRef.close(this.amountFormControl.value);
  }

  setAmount(event: any) {
    if (event.target) {
      event.target.value !== ''
        ? this.isAmount.set(false)
        : this.isAmount.set(true);
    }
  }
}
