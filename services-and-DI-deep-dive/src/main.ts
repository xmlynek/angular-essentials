import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {TasksService} from "./app/tasks/tasks.service";
import {InjectionToken} from "@angular/core";

export const TasksServiceToken = new InjectionToken('tasks-service-token');

// one of the ways of dependency injection
// but it creates the instance even though it might not be used
bootstrapApplication(AppComponent, {providers: [{provide: TasksServiceToken, useClass: TasksService}]})
.catch((err) => console.error(err));

// bootstrapApplication(AppComponent).catch((err) => console.error(err));
