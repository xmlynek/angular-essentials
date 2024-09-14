import {Component, computed, Input, input} from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  avatar = input.required<string>()
  name = input.required<string>()

  imagePath = computed<string>(() => `assets/users/${this.avatar()}`)

  // @Input({required: true}) avatar!: string;
  // @Input({required: true}) name!: string;

  // get imagePath() {
  //   return `assets/users/${this.avatar}`;
  // }

  protected onSelectedUser() {
  }
}
