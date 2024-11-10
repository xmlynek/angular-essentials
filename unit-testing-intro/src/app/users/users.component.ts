import {Component, inject} from '@angular/core';
import {UsersService} from "./users.service";
import {UserModel} from "./user/user.model";
import {UserComponent} from "./user/user.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    UserComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  private userService = inject(UsersService);
  users = this.userService.getUsers();

  addUser(user: UserModel) {
    this.userService.addUser(user);
  }


}
