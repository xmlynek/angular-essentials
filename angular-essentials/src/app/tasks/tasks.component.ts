import {Component, Input} from '@angular/core';
import {TaskComponent} from "./task/task.component";
import {DUMMY_TASKS} from "./dummy-tasks";
import {AddTaskComponent} from "./add-task/add-task.component";
import {CreateTaskRequest} from "./task/task.model";
import {TasksService} from "./tasks.service";

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
  protected isAddTaskModalVisible = false;

  @Input({required: true}) userId!: string;
  @Input({required: true}) userName!: string;

  constructor(private tasksService: TasksService) {

  }

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId);
  }

  protected onCompleteTask(id: string) {
    this.tasksService.deleteTask(id);
    console.log(`Task ${id} completed`);
  }

  protected showAddTaskModal() {
    this.isAddTaskModalVisible = true;
  }

  protected handleCloseTaskModal() {
    this.isAddTaskModalVisible = false;
  }

  protected handleAddTask(taskRequest: CreateTaskRequest) {
    this.tasksService.addTask(this.userId, taskRequest);
    this.isAddTaskModalVisible = false;
  }

}
