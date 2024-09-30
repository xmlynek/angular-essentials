import { Component } from '@angular/core';
import {DashboardItemComponent} from "../../dashboard-item/dashboard-item.component";
import {NewTicketFormComponent} from "../new-ticket-form/new-ticket-form.component";

@Component({
  selector: 'app-support-tickets',
  standalone: true,
  imports: [
    DashboardItemComponent,
    NewTicketFormComponent
  ],
  templateUrl: './support-tickets.component.html',
  styleUrl: './support-tickets.component.css'
})
export class SupportTicketsComponent {

}
