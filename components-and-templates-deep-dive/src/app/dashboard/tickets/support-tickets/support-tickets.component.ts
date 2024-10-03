import { Component } from '@angular/core';
import {DashboardItemComponent} from "../../dashboard-item/dashboard-item.component";
import {NewTicketFormComponent} from "../new-ticket-form/new-ticket-form.component";
import {Ticket, TicketFormRequest} from "./support-tickets.model";
import {TicketComponent} from "../ticket/ticket.component";

@Component({
  selector: 'app-support-tickets',
  standalone: true,
  imports: [
    DashboardItemComponent,
    NewTicketFormComponent,
    TicketComponent
  ],
  templateUrl: './support-tickets.component.html',
  styleUrl: './support-tickets.component.css'
})
export class SupportTicketsComponent {

  protected tickets: Ticket[] = [];

  addTicket(ticket: TicketFormRequest): void {
    this.tickets.push({
      id: Math.random().toString(36),
      title: ticket.title,
      request: ticket.request,
      status: 'open'
    });
  }

  onCloseTicket(id: string) {
    this.tickets = this.tickets.map(ticket => {
      if (ticket.id === id) {
        return {...ticket, status: 'closed'};
      }
      return ticket;
    });
  }

}
