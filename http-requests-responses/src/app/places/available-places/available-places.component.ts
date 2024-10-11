import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';

import {Place} from '../place.model';
import {PlacesComponent} from '../places.component';
import {PlacesContainerComponent} from '../places-container/places-container.component';
import {HttpClient} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";
import {PlacesService} from "../places.service";

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent]
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  private destroyRef = inject(DestroyRef);
  protected isLoading = signal<boolean>(false);
  protected error = signal<string>('');
  private placesService = inject(PlacesService);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.error.set('');
    const subscription = this.placesService.loadAvailablePlaces()
    .subscribe({
      next: places => this.places.set(places),
      error: (error: Error) => this.error.set(error.message),
      complete: () => this.isLoading.set(false)
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectPlace(selectedPlace: Place) {
    const subscription = this.placesService.addPlaceToUserPlaces(selectedPlace)
    .subscribe({
      next: (value) => console.log('Place selected and saved to user\'s list.', value),
      error: (error: Error) => console.error('Error:', error)
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }


}
