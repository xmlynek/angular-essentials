import {Component, EventEmitter, Output, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CreateTaskRequest} from "../task/task.model";

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Output() closeModal = new EventEmitter<void>()
  @Output() addTask = new EventEmitter<CreateTaskRequest>()

  protected enteredTitle = signal('');
  protected enteredSummary = signal('');
  protected enteredDate = signal('');


  protected onClose() {
    this.closeModal.emit();
  }

  protected onSubmit() {
    console.log(this.enteredTitle(), this.enteredSummary(), this.enteredDate());
    this.addTask.emit({
      title: this.enteredTitle(),
      summary: this.enteredSummary(),
      dueDate: this.enteredDate(),
    })
  }
}
