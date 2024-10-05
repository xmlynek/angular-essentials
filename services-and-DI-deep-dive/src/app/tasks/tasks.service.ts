import {inject, Injectable, signal} from "@angular/core";
import {Task, TaskData, TaskStatus} from "./task.model";
import {LoggingService} from "../logging.service";

// @Injectable({
//   providedIn: 'root',
// })
export class TasksService {
  private loggingService = inject(LoggingService);
  private tasks = signal<Task[]>([]);
  public allTasks = this.tasks.asReadonly();

  public addTask(taskData: TaskData) {
    const newTask: Task = {
      id: Math.random().toString(36),
      title: taskData.title,
      description: taskData.description,
      status: "OPEN",
    };
    this.tasks.update(tasks => [...tasks, newTask]);
    this.loggingService.log(`Task "${newTask.title}" added.`);
  }

  public removeTask(taskId: string) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== taskId));
  }

  public getTaskStatus(taskId: string) {
    return this.tasks().find(value => value.id === taskId)?.status;
  }

  public updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update(oldTasks => oldTasks.map(task => task.id === taskId ? {
      ...task,
      status: newStatus
    } : task));
    this.loggingService.log(`Task "${taskId}" status updated to "${newStatus}".`);
  }
}
