import {Component, DestroyRef, inject, OnInit} from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService) {}

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    const sub = this.authService.user.subscribe(user => {
      console.log(user);
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    })

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    })
  }


}
