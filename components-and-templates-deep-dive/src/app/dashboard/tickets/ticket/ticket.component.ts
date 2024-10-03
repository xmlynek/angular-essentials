import {Component, input, output, signal} from '@angular/core';
import {Ticket} from "../support-tickets/support-tickets.model";

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {

  public data = input.required<Ticket>();
  public closeTicket = output<string>();

  detailsVisible = signal(false);

  onToggleDetails() {
    this.detailsVisible.update((prev) => !prev);
  }

  onMarkAsCompleted() {
    this.closeTicket.emit(this.data().id);
  }


}
