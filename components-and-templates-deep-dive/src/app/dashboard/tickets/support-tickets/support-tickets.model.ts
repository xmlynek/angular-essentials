
export interface Ticket {
  id: string;
  title: string;
  request: string;
  status: 'open' | 'closed'
}

export interface TicketFormRequest {
  title: string;
  request: string;
}
