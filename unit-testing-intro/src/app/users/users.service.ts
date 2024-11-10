import {Injectable, Signal, signal} from "@angular/core";
import {UserModel} from "./user/user.model";

export const DUMMY_USERS: Array<UserModel> = [
  {
    id: "1",
    name: "John Doe",
    isEnabled: true
  },
  {
    id: "2",
    name: "Jane Smith",
    isEnabled: false
  },
  {
    id: "3",
    name: "Michael Johnson",
    isEnabled: true
  },
  {
    id: "4",
    name: "Sarah Brown",
    isEnabled: false
  }
]

@Injectable({providedIn: "root"})
export class UsersService {
  private users = signal<Array<UserModel>>(DUMMY_USERS);

  getUsers(): Signal<Array<UserModel>> {
    return this.users.asReadonly();
  }

  addUser(user: UserModel): void {
    this.users.update((prevUsers) => [...prevUsers, user]);
  }

  removeUser(userId: string): void {
    this.users.update((prevUsers) => prevUsers.filter(user => user.id !== userId));
  }

  enableUser(userId: string): void {
    this.users.update((prevUsers) => prevUsers.map(user => user.id === userId ? {
      ...user,
      isEnabled: true
    } : user));
  }
}
