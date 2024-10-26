import {Component, computed, DestroyRef, inject, input, OnInit} from '@angular/core';
import {UsersService} from "../users.service";
import {TasksService} from "../../tasks/tasks.service";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet, RouterStateSnapshot
} from "@angular/router";
import {User} from "../user/user.model";
import {pipe} from "rxjs";

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [
    RouterOutlet,
    RouterLink
  ]
})
export class UserTasksComponent implements OnInit {

  user = input.required<User | undefined>();
  title = input.required<string>();  // static data from app.routes
  // private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
  // user?: User;


  // userId = input.required<string>();
  // user = computed(() => this.usersService.users.find(u => u.id === this.userId()))


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(value => console.log(value))

  //   console.log(this.title());
  //   console.log(this.activatedRoute);
  //   const sub = this.activatedRoute.params.subscribe(params => {
  //     this.user = this.usersService.users.find(u => u.id === params['userId']);
  //   });
  //
  //   this.destroyRef.onDestroy(() => {
  //     sub.unsubscribe();
  //   })
  }

  // private tasksService = inject(TasksService);


  // get getUserTasks() {
  //   this.tasksService.allTasks().filter(task => task.userId === this.userId())
  // }

}

export const resolveUser: ResolveFn<User | undefined> = (route: ActivatedRouteSnapshot,
                                state: RouterStateSnapshot) => {
  const usersService = inject(UsersService);
  const userId = route.paramMap.get('userId');

  console.log('resolving userId', userId)

  return usersService.users.find(u => u.id === userId);
}

export const resolveTitle: ResolveFn<string> = (route: ActivatedRouteSnapshot,
                                                         state: RouterStateSnapshot) => {
  console.log('resolving title')
  const resolvedUser = resolveUser(route, state) as User;

  return resolvedUser? `${resolvedUser.name}'s Tasks` : 'Unknown User\'s Tasks';
}
