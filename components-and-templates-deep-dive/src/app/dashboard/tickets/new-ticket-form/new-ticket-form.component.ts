import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  output,
  ViewChild,
} from '@angular/core';
import {ButtonComponent} from "../../../shared/button/button.component";
import {ControlComponent} from "../../../shared/control/control.component";
import {FormsModule} from "@angular/forms";
import {TicketFormRequest} from "../support-tickets/support-tickets.model";

@Component({
  selector: 'app-new-ticket-form',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket-form.component.html',
  styleUrl: './new-ticket-form.component.css'
})
export class NewTicketFormComponent implements OnInit, AfterViewInit {

  @ViewChild("form") private form?: ElementRef<HTMLFormElement>;
  public createTicket = output<TicketFormRequest>()

  // private form = viewChild.required<ElementRef<HTMLFormElement>>("form");


  onSubmit(titleText: string, ticketText: string) {
    console.log('SUBMITTED!');
    console.log('Ticket title:', titleText);
    console.log('Ticket text:', ticketText);
    this.createTicket.emit({title: titleText, request: ticketText});
    this.form?.nativeElement.reset();
  }

  ngOnInit(): void {
    console.log('OnInit');
    console.log(this.form?.nativeElement)
  }


  ngAfterViewInit(): void {
    console.log('AFTER VIEW INIT');
    console.log(this.form?.nativeElement)
  }


}
