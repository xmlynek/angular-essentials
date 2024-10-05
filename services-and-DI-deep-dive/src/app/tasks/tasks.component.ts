import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
// import {TasksService} from "./tasks.service";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
  // another way of DI using element injector, every child component will have access to the same instance
  // but every instance if this TasksComponent will have its own instance of TasksService!
  // providers: [TasksService]
})
export class TasksComponent {}
