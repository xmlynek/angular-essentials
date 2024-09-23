import {Injectable} from "@angular/core";
import {User} from "./user/user.model";
import {DUMMY_USERS} from "./dummy-users";

@Injectable({providedIn: "root"})
export class UsersService {

  private users: User[] = DUMMY_USERS;

  public getUsers(): User[] {
    return this.users;
  }

  public getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

}
