import {DUMMY_TASKS} from "./dummy-tasks";
import {CreateTaskRequest, Task} from "./task/task.model";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: Task[] = DUMMY_TASKS;

  constructor() {
    const tasks = localStorage.getItem("tasks")

    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  public getUserTasks(userId: string): Task[] {
    return this.tasks.filter(task => task.userId === userId);
  }

  public addTask(userId: string, taskRequest: CreateTaskRequest): void {
    this.tasks.push({
      id: Math.random().toString(36),
      userId: userId,
      title: taskRequest.title,
      summary: taskRequest.summary,
      dueDate: taskRequest.dueDate,
    })
    this.saveTasks();
  }

  public deleteTask(taskId: string) {
    this.tasks = this.tasks.filter(task => task.id!== taskId);
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

}
