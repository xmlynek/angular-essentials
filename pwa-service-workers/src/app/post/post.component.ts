import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  standalone: true,
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() title!: string;
  @Input() content!: string;
}
