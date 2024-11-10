import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersComponent} from './users.component';
import SpyObj = jasmine.SpyObj;
import {UsersService} from "./users.service";
import {UserModel} from "./user/user.model";
import {UserComponent} from "./user/user.component";
import {signal} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userServiceSpy: SpyObj<UsersService>;

  const mockUsers: UserModel[] = [
    { id: '1', name: 'John Doe', isEnabled: true },
    { id: '2', name: 'Jane Smith', isEnabled: false },
  ];

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UsersService', ['getUsers']);
    userServiceSpy.getUsers.and.returnValue(signal(mockUsers));

    await TestBed.configureTestingModule({
      imports: [UsersComponent, UserComponent],
      providers: [{ provide: UsersService, useValue: userServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of user components', () => {
    const userComponents = fixture.debugElement.queryAll(By.directive(UserComponent));
    expect(userComponents.length).toBe(mockUsers.length);
  });

  it('should pass the correct user data to each user component', () => {
    const userComponents = fixture.debugElement.queryAll(By.directive(UserComponent));

    userComponents.forEach((userComponentDebugEl, index) => {
      const userComponentInstance = userComponentDebugEl.componentInstance as UserComponent;
      expect(userComponentInstance.user()).toEqual(mockUsers[index]);
    });
  });
});
