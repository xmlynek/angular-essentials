import {Component, EventEmitter, Input, model, Output} from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // @Input({required: true}) size!: { width: string; height: string };
  //// this output must have this name for the angular to understand that i want 2w binding
  // @Output() sizeChange = new EventEmitter<{ width: string; height: string }>();

  size = model.required<{ width: string; height: string }>();

  onReset() {
    console.log('on reset')
    this.size.set({
      width: '200',
      height: '100',
    })
    // this.sizeChange.emit({
    //   width: '200',
    //   height: '100',
    // })
  }
}
