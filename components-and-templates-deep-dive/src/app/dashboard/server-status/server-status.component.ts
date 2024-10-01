import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardItemComponent} from "../dashboard-item/dashboard-item.component";

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [
    DashboardItemComponent
  ],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit {

  protected currentStatus: 'online' | 'offline' | 'unknown' = 'online';


  /**
   * Initializes the component and sets up a timer to periodically update the server status.
   *
   * The server status is randomly determined every 5 seconds and can be one of the following:
   * - 'online': Represents an active server.
   * - 'offline': Represents an inactive server.
   * - 'unknown': Represents an unknown server status.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    setInterval(() => {
      const rnd = Math.random();

      if (rnd < 0.5) {
        this.currentStatus = 'online';
      } else if (rnd < 0.9) {
        this.currentStatus = 'offline';
      } else {
        this.currentStatus = 'unknown';
      }
    }, 5000);
  }




}
