import {
  Component, ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "control", // this will add class="control" to each host element, in this case app-control
    '(click)': 'onClick()'
  }
})
export class ControlComponent {
  // @HostBinding('class') className = 'control'; // rovnake ako host object na @component
  // @HostListener('click')
  onClick() {
    console.log('Control clicked');
    console.log(this.el)
  }

  private el = inject(ElementRef)

  label = input.required<string>()


}
