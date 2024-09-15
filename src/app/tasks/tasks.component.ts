import {Component, Input} from '@angular/core';
import {TaskComponent} from "../task/task.component";
import {DUMMY_TASKS} from "../dummy-tasks";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TaskComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  protected tasks = DUMMY_TASKS;

  @Input({required: true}) userId!: string;
  @Input({required: true}) userName!: string;
  // @Input({required: true}) user!: User;


  get selectedUserTasks() {
    return this.tasks.filter(task => task.userId === this.userId);
  }

}
