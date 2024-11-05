import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {animate, group, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState',
      [
        state('normal', style({
          backgroundColor: 'red',
          transform: 'translateX(0)'
        })),
        state('highlighted', style({
          backgroundColor: 'blue',
          transform: 'translateX(100px)'
        })),
        transition('normal <=> highlighted', animate('1s ease-in-out')),
        // transition('normal => highlighted', animate('1s ease-in-out')),
        // transition('highlighted => normal', animate('1s ease-in-out'))
      ]),

    trigger('wildState',
      [
        state('normal', style({
          backgroundColor: 'red',
          transform: 'translateX(0) scale(1)',
          borderRadius: 0
        })),
        state('highlighted', style({
          backgroundColor: 'blue',
          transform: 'translateX(100px) scale(1)',
          borderRadius: 0
        })),
        state('shrunken', style({
          backgroundColor: 'green',
          transform: 'translateX(0px) scale(0.5)',
          borderRadius: 0
        })),
        transition('normal => highlighted', animate('800ms ease-in-out')),
        transition('highlighted => normal', animate('300ms ease-in-out')),
        transition('shrunken <=> *', [
          style({
            backgroundColor: 'orange'
          }),
          animate('1000ms ease-in-out', style({
            borderRadius: '50px'
          })),
          animate('500ms ease-in-out')
        ]),
      ]),

    trigger('list1',
      [
        state('in', style({
          opacity: 1,
          transform: 'translateX(0)'
        })),
        transition('void => *', [
          style({opacity: 0, transform: 'translateX(-100px)'}),
          animate('300ms ease-in-out'),
        ]),
        transition('* => void', [
          animate('300ms ease-in-out', style({
              opacity: 0, transform: 'translateX(100px)'
            }),
          ),
        ]),
      ]),
    trigger('list2',
      [
        state('in', style({
          opacity: 1,
          transform: 'translateX(0)'
        })),
        transition('void => *', animate(1000, keyframes([
          style({opacity: 0, offset: 0, transform: 'translateX(-100px)'}),
          style({opacity: 0.5, offset: 0.3, transform: 'translateX(-50px)'}),
          style({opacity: 1, offset: 0.8, transform: 'translateX(-20px)'}),
          style({opacity: 1, offset: 1, transform: 'translateX(0px)'}),
        ]))),
        transition('* => void', [
          group([
            animate('700ms ease-in-out', style({
              opacity: 0, transform: 'translateX(100px)'
            })),
            animate('300ms', style({
              backgroundColor: 'red'
            })),
          ])
        ]),
      ]),
  ],
  imports: [
    NgForOf
  ]
})
export class AppComponent {
  state: string = 'normal';
  wildState: string = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAdd(item: string) {
    this.list.push(item);
  }

  onDelete(item: string) {
    this.list = this.list.filter((i) => i !== item);
  }

  onAnimate() {
    this.state = this.state === 'normal' ? 'highlighted' : 'normal';
    this.wildState = this.wildState === 'normal' ? 'highlighted' : 'normal';
  }

  onShrunk() {
    this.wildState = 'shrunken';
  }

  animationStarted(event: any) {
    console.log('Animation started', event);
  }

  animationEnded(event: any) {
    console.log('Animation ended', event);
  }
}
