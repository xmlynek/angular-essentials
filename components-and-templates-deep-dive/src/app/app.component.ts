import { Component } from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {SupportTicketsComponent} from "./dashboard/support-tickets/support-tickets.component";
import {ServerStatusComponent} from "./dashboard/server-status/server-status.component";
import {TrafficComponent} from "./dashboard/traffic/traffic.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    HeaderComponent,
    SupportTicketsComponent,
    ServerStatusComponent,
    TrafficComponent
  ]
})
export class AppComponent {

}
