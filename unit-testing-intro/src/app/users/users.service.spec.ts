import {UserModel} from "./user/user.model";
import {DUMMY_USERS, UsersService} from "./users.service";
import {TestBed} from "@angular/core/testing";

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    service = TestBed.inject(UsersService);
  })

  it('should retrieve initial users list as read-only signal', () => {
    const users = service.getUsers();
    expect(users()).toEqual(DUMMY_USERS);
  });

  it('should add a user to the users list', () => {
    const newUser: UserModel = { id: "5", name: "Alice White", isEnabled: true };
    service.addUser(newUser);

    const users = service.getUsers();
    expect(users()).toContain(newUser);
    expect(users().length).toBe(DUMMY_USERS.length + 1);
  });

  it('should remove a user from the users list by ID', () => {
    const userIdToRemove = "2";
    service.removeUser(userIdToRemove);

    const users = service.getUsers();
    expect(users().some(user => user.id === userIdToRemove)).toBeFalse();
    expect(users().length).toBe(DUMMY_USERS.length - 1);
  });

  it('should enable a user by updating isEnabled to true', () => {
    const userIdToEnable = "2";
    service.enableUser(userIdToEnable);

    const users = service.getUsers();
    const updatedUser = users().find(user => user.id === userIdToEnable);
    expect(updatedUser).toBeDefined();
    expect(updatedUser?.isEnabled).toBeTrue();
  });
})
