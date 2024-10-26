import {Routes} from "@angular/router";
import {resolveUserTasks, TasksComponent} from "../tasks/tasks.component";
import {canLeaveEditPage, NewTaskComponent} from "../tasks/new-task/new-task.component";

export const usersRoutes: Routes = [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks',
        component: TasksComponent,
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
