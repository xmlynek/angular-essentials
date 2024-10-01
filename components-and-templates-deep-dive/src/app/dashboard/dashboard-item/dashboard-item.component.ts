import {Component, input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.css',
  // host: {
  //   class: "dashboard-item"
  // }
})
export class DashboardItemComponent {

  public image = input.required<{src: string, alt: string}>();
  public headerTitle = input.required<string>();

}
