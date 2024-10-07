import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private messages = signal<string[]>([]);
  allMessages = this.messages.asReadonly();

  // private messages : string[] = [];
  // messages$ = new BehaviorSubject<string[]>(this.messages);

  // get allMessages() {
  //   return this.messages;
  // }

  addMessage(message: string) {
    this.messages.update((prevMessages) => [...prevMessages, message]);
    // this.messages = [...this.messages, message];
    // this.messages$.next(this.messages);
  }
}
