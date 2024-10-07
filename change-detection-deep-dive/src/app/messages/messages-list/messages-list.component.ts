import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, DestroyRef,
  inject,
  OnInit
} from '@angular/core';
import {MessagesService} from "../messages.service";
import {AsyncPipe} from "@angular/common";


@Component({
  selector: 'app-messages-list',
  standalone: true,
  // imports: [AsyncPipe],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListComponent {
  private messagesService = inject(MessagesService);
  messages = this.messagesService.allMessages;

  // messages: string[] = [];
  // private cdRef = inject(ChangeDetectorRef);
  // private destroyRef = inject(DestroyRef);


  // ngOnInit(): void {
  //   const subscription = this.messagesService.messages$.subscribe((updatedMessages) => {
  //     console.log('[MessagesList] Messages updated:', updatedMessages);
  //     this.messages = updatedMessages;
  //     this.cdRef.markForCheck();
  //   })
  //
  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }


  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
