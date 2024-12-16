import {Component, computed, inject, Input} from '@angular/core';
import {MatToolbarRow} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarRow,
    RouterLink,
    MatButton,
    NgForOf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() paths: { path: string; label: string }[] = [];

  private keycloakService = inject(KeycloakService);
  isLoggedIn = computed<boolean>(() => this.keycloakService.isLoggedIn());


}
