import {Component, computed, EventEmitter, Input, input, output, Output} from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  avatar = input.required<string>()
  id = input.required<string>()
  name = input.required<string>()
  imagePath = computed<string>(() => `assets/users/${this.avatar()}`)
  select = output<string>()

  // @Input({required: true}) id!: string;
  // @Input({required: true}) avatar!: string;
  // @Input({required: true}) name!: string;
  // @Output() select = new EventEmitter();

  // get imagePath() {
  //   return `assets/users/${this.avatar}`;
  // }

  protected onSelectedUser() {
    this.select.emit(this.id());
  }
}
