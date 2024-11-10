import {Component, computed, inject, input} from '@angular/core';
import {UserModel} from "./user.model";
import {UsersService} from "../users.service";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user = input.required<UserModel>();
  isEnabled = computed(() => this.user().isEnabled);

  private userService = inject(UsersService);

  enableUser() {
    this.userService.enableUser(this.user().id);
  }

  removeUser() {
    this.userService.removeUser(this.user().id);
  }

}
