import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "./task.model";
import {CardComponent} from "../../shared/card/card.component";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CardComponent,
    DatePipe
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

    @Input({required: true}) task!: Task;
    @Output() completeTask = new EventEmitter<string>()

    handleCompleteTask() {
      this.completeTask.emit(this.task.id);
    }
}
