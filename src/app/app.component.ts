import {Component} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {UserComponent} from "./users/user/user.component";

import {TasksComponent} from "./tasks/tasks.component";
import {User} from "./users/user/user.model";
import {UsersComponent} from "./users/users.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    UserComponent,
    TasksComponent,
    UsersComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  protected selectedUser?: User;

  onSelectUser(user: User) {
    console.log('selected user ', user);
    this.selectedUser = user;
  }
}
