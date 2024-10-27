import {Route, Router, Routes, UrlSegment} from "@angular/router";
import {NoTaskComponent} from "./tasks/no-task/no-task.component";
import {
  resolveTitle,
  resolveUser,
  UserTasksComponent
} from "./users/user-tasks/user-tasks.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {inject} from "@angular/core";


const demoCanMatch = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router)
  const random = Math.random();
  // if (random > 0.5) {
  return true;
  // }
  // return new RedirectCommand(router.parseUrl("/unauthorized"));
}

export const appRoutes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'Select a user'
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    loadChildren: () => import("./users/users.routes").then(mod => mod.usersRoutes),
    data: {
      title: 'User Tasks'
    },
    canMatch: [demoCanMatch],
    resolve: {
      user: resolveUser
    },
    title: resolveTitle,
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]
