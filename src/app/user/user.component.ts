import {Component, signal, computed} from '@angular/core';

import {DUMMY_USERS} from "../dummy-users";

const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  protected selectedUser = signal(DUMMY_USERS[randomIndex]);
  // more effective because tha path will be re-computed only when the signal inside is changed
  protected imagePath = computed(() => `assets/users/${this.selectedUser().avatar}`)

  protected onSelectedUser() {
    this.selectedUser.set(DUMMY_USERS[Math.floor(Math.random() * DUMMY_USERS.length)]);
  }
}
