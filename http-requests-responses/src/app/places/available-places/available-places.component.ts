import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';

import {Place} from '../place.model';
import {PlacesComponent} from '../places.component';
import {PlacesContainerComponent} from '../places-container/places-container.component';
import {HttpClient} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent]
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  protected isLoading = signal<boolean>(false);
  protected error = signal<string>('');

  ngOnInit(): void {
    this.isLoading.set(true);
    this.error.set('');
    const subscription = this.httpClient.get<{ places: Place[] }>("http://localhost:3000/places", {
      // observe: 'response'
    })
    .pipe(
      map(response => response.places),
      catchError((err, caught) => {
        console.log('Error:', err);
        return throwError(() => new Error('Something went wrong when fetching available places. Please try again later!'))
      })
    )
    .subscribe({
      next: places => this.places.set(places),
      error: (error: Error) => this.error.set(error.message),
      complete: () => this.isLoading.set(false)
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }


}
