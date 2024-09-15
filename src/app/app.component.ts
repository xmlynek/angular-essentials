import {Component} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {UserComponent} from "./user/user.component";

import {DUMMY_USERS} from "./dummy-users";
import {TasksComponent} from "./tasks/tasks.component";
import {User} from "./user/user.model";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    UserComponent,
    TasksComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  protected users = DUMMY_USERS;
  protected selectedUser?: User;

  onSelectUser(id: string) {
    console.log('selected user ', id);
    this.selectedUser = this.users.find((user) => user.id === id);
  }
}
