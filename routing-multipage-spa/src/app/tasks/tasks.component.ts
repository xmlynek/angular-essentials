import {Component, computed, DestroyRef, inject, input, OnInit, signal} from '@angular/core';

import {TaskComponent} from './task/task.component';
import {Task} from './task/task.model';
import {TasksService} from "./tasks.service";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterLink,
  RouterStateSnapshot
} from "@angular/router";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>();
  order = input.required<'asc' | 'desc' | undefined>();
  userTasks = input.required<Task[]>();

  toggleOrder = computed(() => this.order() === 'asc' ? 'desc' : 'asc')

  ngOnInit(): void {
    console.log("Tasks init")
  }
  // private tasksService = inject(TasksService);

  // druha moznost pomocou activatedRoute
  // protected order = signal<'asc' | 'desc'>('desc')
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);

  // userTasks = computed(() =>
  //   this.tasksService.allTasks().filter(task => task.userId === this.userId())
  //   .sort((a, b) => {
  //     if (this.order() === 'asc') {
  //
  //       return a.dueDate > b.dueDate ? 1 : -1;
  //     } else {
  //       return a.dueDate < b.dueDate ? 1 : -1;
  //     }
  //   })
  // );

  // ngOnInit(): void {
  //   const sub = this.activatedRoute.queryParamMap.subscribe(params => {
  //     this.order.set(params.get('order') as 'asc' | 'desc');
  //   });
  //
  //   this.destroyRef.onDestroy(() => sub.unsubscribe());
  // }
}


export const resolveUserTasks = (
  route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const tasksService = inject(TasksService);

  const userId = route.paramMap.get('userId');
  const order = route.queryParamMap.get('order');

  console.log(`resolving user ${userId} tasks`)

  return tasksService.allTasks().filter(task => task.userId === userId)
  .sort((a, b) => {
    if (order === 'asc') {
      return a.dueDate > b.dueDate ? 1 : -1;
    } else {
      return a.dueDate < b.dueDate ? 1 : -1;
    }
  })
}
