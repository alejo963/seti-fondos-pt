import { Component, signal } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';
import { MatRadioChange } from '@angular/material/radio';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './user.component.html',
})
export class AppUserComponent {
  user = signal<User>({} as User);
  notificationMethods = ['email', 'sms'];
  selectedMethod = signal<string>('');

  formGroup = new FormGroup({
    email: new FormControl('email', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('phoneNumber', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
    ]),
    // method: new FormControl('method', [Validators.required]),
  });

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser(environment.testUserId).subscribe({
      next: (user) => {
        this.user.set(user);
        this.formGroup.get('email')?.setValue(user.email);
        this.formGroup.get('phoneNumber')?.setValue(user.phoneNumber.slice(3));
        this.selectedMethod.set(user.notificationMethod);
      },
    });
  }

  openModal() {
    const payload = {
      email: this.formGroup.get('email')?.value,
      phoneNumber: `+57${this.formGroup.get('phoneNumber')?.value}`,
      notificationMethod: this.selectedMethod(),
    };
    this.userService.updateUser(environment.testUserId, payload).subscribe({
      next: (user) => {
        this.user.set(user);
      },
    });
  }
}
