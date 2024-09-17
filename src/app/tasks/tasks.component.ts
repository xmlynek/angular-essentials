import {Component, Input} from '@angular/core';
import {TaskComponent} from "../task/task.component";
import {DUMMY_TASKS} from "../dummy-tasks";
import {AddTaskComponent} from "../add-task/add-task.component";
import {CreateTaskRequest} from "../task/task.model";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TaskComponent,
    AddTaskComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  protected tasks = DUMMY_TASKS;
  protected isAddTaskModalVisible = false;

  @Input({required: true}) userId!: string;
  @Input({required: true}) userName!: string;

  get selectedUserTasks() {
    return this.tasks.filter(task => task.userId === this.userId);
  }

  protected onCompleteTask(id: string) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    console.log(`Task ${id} completed`);
  }

  protected showAddTaskModal() {
    this.isAddTaskModalVisible = true;
  }

  protected handleCloseTaskModal() {
    this.isAddTaskModalVisible = false;
  }

  protected handleAddTask(taskRequest: CreateTaskRequest) {
    this.tasks.push({
      id: Math.random().toString(36),
      userId: this.userId,
      title: taskRequest.title,
      summary: taskRequest.summary,
      dueDate: taskRequest.dueDate,
    })
    this.isAddTaskModalVisible = false;
  }

}
