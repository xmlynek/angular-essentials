import {Directive, ElementRef, inject} from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'logClick()'
  }
})
export class LogDirective {

  private elementRef = inject(ElementRef);

  constructor() { }

  logClick() {
    console.log('Clicked!');
    console.log(this.elementRef.nativeElement);
  }


}
