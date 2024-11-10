import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserComponent} from './user.component';
import {UsersService} from "../users.service";
import {UserModel} from "./user.model";


describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userServiceSpy: jasmine.SpyObj<UsersService>;

  const mockUser = {
    id: '1',
    name: 'John Doe',
    isEnabled: true
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UsersService', ['enableUser', 'removeUser']);

    await TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [{provide: UsersService, useValue: spy}],
    })
    .compileComponents();

    userServiceSpy = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', mockUser);

    fixture.autoDetectChanges();
  });

  it('should create component', async () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct user input', () => {
    expect(component.user()).toEqual(mockUser);
  });

  it('should correctly compute isEnabled based on user input', () => {
    expect(component.isEnabled()).toBeTrue();
  });

  it('should call enableUser on userService when enableUser is invoked', () => {
    component.enableUser();
    expect(userServiceSpy.enableUser).toHaveBeenCalledWith(mockUser.id);
  });

  it('should call removeUser on userService when removeUser is invoked', () => {
    component.removeUser();
    expect(userServiceSpy.removeUser).toHaveBeenCalledWith(mockUser.id);
  });

  it('should display user is ENABLED when isEnabled is true', async () => {
    const paragraphText = fixture.nativeElement.querySelector('p').textContent;
    const deleteButton = fixture.nativeElement.querySelector('button');

    expect(deleteButton).toBeTruthy();
    expect(deleteButton.textContent).toContain('Delete User');
    expect(paragraphText).toContain(`${mockUser.name} is ENABLED!`);
  });

  it('should display user is NOT ENABLED when isEnabled is false', async () => {
    fixture.componentRef.setInput('user', {...mockUser, isEnabled: false} as UserModel)
    fixture.detectChanges();

    const paragraphText = fixture.nativeElement.querySelector('p').textContent;
    const enableUserButton = fixture.nativeElement.querySelector('button');

    expect(enableUserButton).toBeTruthy();
    expect(enableUserButton.textContent).toContain('Enable User');
    expect(paragraphText).toContain(`${mockUser.name} is NOT ENABLED!`);
  });

  it('should call removeUser on userService when delete button is clicked', async () => {
    const deleteButton = fixture.nativeElement.querySelector('button');
    deleteButton.click();

    expect(userServiceSpy.removeUser).toHaveBeenCalledWith(mockUser.id);
  });

  it('should call enableUser on userService when enable button is clicked', async () => {
    fixture.componentRef.setInput('user', {...mockUser, isEnabled: false} as UserModel)
    fixture.detectChanges();

    const enableUserButton = fixture.nativeElement.querySelector('button');
    enableUserButton.click();

    expect(userServiceSpy.enableUser).toHaveBeenCalledWith(mockUser.id);
  });
});
