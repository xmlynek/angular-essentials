import {Routes} from "@angular/router";
import {resolveUserTasks, TasksComponent} from "../tasks/tasks.component";
import {canLeaveEditPage, NewTaskComponent} from "../tasks/new-task/new-task.component";
import {TasksService} from "../tasks/tasks.service";

export const usersRoutes: Routes = [
  {
    path: '',
    providers: [TasksService],
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks',
        component: TasksComponent,
        // loadComponent: () => import("../tasks/tasks.component").then(mod => mod.TasksComponent),
        // runGuardsAndResolvers: 'paramsOrQueryParamsChange', // needed for resolver to update sort
        runGuardsAndResolvers: 'always', // needed for resolver to fetch tasks when task completed
        resolve: {
          userTasks: resolveUserTasks
        },
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage]
      }
    ]
  }
]
