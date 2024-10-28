import { Component, OnInit, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-cancel-modal',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './modal.component.html',
})
export class CancelSubscriptionModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CancelSubscriptionModalComponent>
  ) {}

  ngOnInit(): void {}

  closeFalse() {
    this.dialogRef.close(false);
  }

  closeTrue() {
    this.dialogRef.close(true);
  }
}
