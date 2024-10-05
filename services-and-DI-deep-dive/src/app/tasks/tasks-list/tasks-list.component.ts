import {Component, computed, inject, signal} from '@angular/core';

import {TaskItemComponent} from './task-item/task-item.component';
import {TasksService} from "../tasks.service";
import {
  TASK_STATUS_OPTIONS,
  TaskFilter,
  taskStatusOptionsProvider
} from "../task.model";
import {TasksServiceToken} from "../../../main";

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [taskStatusOptionsProvider]
})
export class TasksListComponent {
  protected selectedFilter = signal<TaskFilter>('all');
  private tasksService = inject<TasksService>(TasksServiceToken);
  protected taskStatusOptions = inject(TASK_STATUS_OPTIONS);

  protected tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'all':
        return this.tasksService.allTasks();
      case 'open':
        return this.tasksService.allTasks().filter(value => value.status === 'OPEN');
      case 'done':
        return this.tasksService.allTasks().filter(value => value.status === 'DONE');
      case 'in-progress':
        return this.tasksService.allTasks().filter(value => value.status === 'IN_PROGRESS');
      default:
        return this.tasksService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter as TaskFilter);
  }
}
