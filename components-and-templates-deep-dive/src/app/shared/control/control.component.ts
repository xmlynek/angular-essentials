import {
  AfterContentInit, afterNextRender, afterRender,
  Component, contentChild, ContentChild, ElementRef,
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
export class ControlComponent implements AfterContentInit {
  // @HostBinding('class') className = 'control'; // rovnake ako host object na @component

  // @ContentChild("input") private inputControl? = ElementRef<HTMLInputElement | HTMLTextAreaElement>;
  private inputControl = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>("input")

  private el = inject(ElementRef)
  label = input.required<string>()

  constructor() {
    // pocuvaju na zmeny v ramci celej aplikacie
    afterRender(() => {
      console.log('After render');
    })

    afterNextRender(() => {
      console.log('After next render');
    })
  }

  // @HostListener('click')
  onClick() {
    console.log('Control clicked');
    console.log(this.el)
    console.log(this.inputControl());
  }

  ngAfterContentInit(): void {
    console.log(this.inputControl()?.nativeElement)
  }


}
