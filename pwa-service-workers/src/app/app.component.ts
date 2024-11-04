import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Post} from "./post/post.model";
import {PostComponent} from "./post/post.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PostComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  posts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    .subscribe(fetchedPosts => (this.posts = fetchedPosts));
  }
}
