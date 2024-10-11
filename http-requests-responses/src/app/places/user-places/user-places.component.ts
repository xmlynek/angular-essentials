import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';

import {PlacesContainerComponent} from '../places-container/places-container.component';
import {PlacesComponent} from '../places.component';
import {Place} from "../place.model";
import {PlacesService} from "../places.service";

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  protected destroyRef = inject(DestroyRef);
  protected isLoading = signal<boolean>(false);
  protected error = signal<string>('');
  private placesService = inject(PlacesService);
  protected userPlaces = this.placesService.loadedUserPlaces;

  ngOnInit(): void {
    const subscription = this.placesService.loadUserPlaces()
    .subscribe({
      error: (error) => console.error(error),
      complete: () => this.isLoading.set(false)
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onRemovePlace(selectedPlace: Place) {
    const subscription = this.placesService.removeUserPlace(selectedPlace)
    .subscribe({
      error: (error) => console.error(error)
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }


}
