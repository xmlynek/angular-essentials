import { Routes } from '@angular/router';
import {AuthGuard} from "./auth/auth.guard";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(value => value.HomeComponent),
  },
  {
    path: 'secured',
    loadComponent: () => import('./secured/secured.component').then(value => value.SecuredComponent),
    canActivate: [AuthGuard],
    data: { roles: ['USER'] },
  },
];
