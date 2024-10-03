import {
  AfterViewInit,
  Component,
  DestroyRef, effect,
  inject,
  OnInit,
  signal
} from '@angular/core';
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
export class ServerStatusComponent implements OnInit, AfterViewInit {

  protected currentStatus = signal<'online' | 'offline' | 'unknown'>('online');
  private destroyRef = inject(DestroyRef);

  // private interval?: ReturnType<typeof setInterval>;

  constructor() {
    effect(() => {
      console.log('EFFECT');
      console.log(this.currentStatus());
    })
  }


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
    console.log('ON INIT')
    const interval = setInterval(() => {
      const rnd = Math.random();

      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    });
  }

  ngAfterViewInit(): void {
    console.log('AFTER VIEW INIT');
  }

  // ngOnDestroy(): void {
  //   clearTimeout(this.interval);
  // }

}
