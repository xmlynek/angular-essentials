import {Component} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {UserComponent} from "./user/user.component";

import {DUMMY_USERS, User} from "./dummy-users";
import {NgForOf, NgIf} from "@angular/common";
import {TasksComponent} from "./tasks/tasks.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    UserComponent,
    TasksComponent,
    NgForOf,
    NgIf,
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
