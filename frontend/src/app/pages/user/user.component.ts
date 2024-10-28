import { Component, signal } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';
import { MatRadioChange } from '@angular/material/radio';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './user.component.html',
})
export class AppUserComponent {
  constructor(private userService: UserService) {}
  user = signal<User>({} as User);
  ngOnInit() {
    this.userService.getUser(environment.testUserId).subscribe({
      next: (user) => {
        this.user.set(user);
      },
    });
  }

  handleRadioEvent(event: MatRadioChange) {
    const payload = { notificationMethod: event.value };
    this.userService.updateUser(environment.testUserId, payload).subscribe({
      next: (user) => {
        this.user.set(user);
      },
    });
  }
}
