import {Component, computed, EventEmitter, Input, input, output, Output} from '@angular/core';
import {User} from "./user.model";
import {CardComponent} from "../shared/card/card.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  // avatar = input.required<string>()
  // id = input.required<string>()
  // name = input.required<string>()
  // imagePath = computed<string>(() => `assets/users/${this.avatar()}`)
  // select = output<string>()
  //
  // @Input({required: true}) id!: string;
  // @Input({required: true}) avatar!: string;
  // @Input({required: true}) name!: string;

  @Input({required: true}) user!: User
  @Input({required: true}) isSelected!: boolean;
  @Output() select = new EventEmitter<string>();

  get imagePath() {
    return `assets/users/${this.user.avatar}`;
  }

  protected onSelectedUser() {
    this.select.emit(this.user.id);
  }
}
