import {Component, EventEmitter, inject, Output} from '@angular/core';
import {UsersService} from "./users.service";
import {UserComponent} from "./user/user.component";
import {User} from "./user/user.model";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  // Another way of dependency injection
  protected usersService: UsersService = inject(UsersService);
  protected selectedUser?: User;

  @Output() selectUserId = new EventEmitter<User>();

  onSelectUser(userId: string) {
    this.selectedUser = this.usersService.getUserById(userId);
    this.selectUserId.emit(this.selectedUser);
  }

}
