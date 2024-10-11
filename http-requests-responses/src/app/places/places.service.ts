import {inject, Injectable, signal} from '@angular/core';

import {Place} from './place.model';
import {HttpClient} from "@angular/common/http";
import {catchError, map, of, tap, throwError} from "rxjs";
import {ErrorService} from "../shared/error.service";

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private errorService = inject(ErrorService);
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces("http://localhost:3000/places",
      'Something went wrong when fetching available places. Please try again later!');
  }

  loadUserPlaces() {
    return this.fetchPlaces("http://localhost:3000/user-places",
      'Something went wrong when fetching user favorite places. Please try again later!')
    .pipe(tap({
      next: (places) => {
        this.userPlaces.set(places);
      }
    }));
  }

  addPlaceToUserPlaces(place: Place) {
    if (this.loadedUserPlaces().some(p => p.id === place.id)) return of({userPlaces: []});

    return this.httpClient.put<{
      userPlaces: Place[]
    }>("http://localhost:3000/user-places", {placeId: place.id})
    .pipe(
      tap({next: (res) => this.userPlaces.set(res.userPlaces)}),
      catchError((err: Error) => {
        this.errorService.showError('Failed to store selected place');
        return throwError(() => new Error('Failed to store selected place'));
      })
    );
  }

  removeUserPlace(place: Place) {
    return this.httpClient.delete<{
      userPlaces: Place[]
    }>(`http://localhost:3000/user-places/${place.id}`)
    .pipe(
      tap({next: (response) => {this.userPlaces.set(response.userPlaces);}}),
      catchError((err: Error) => {
        this.errorService.showError('Failed to remove selected place');
        return throwError(() => new Error('Failed to remove selected place'));
      })
    )
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url)
    .pipe(
      map(response => response.places),
      catchError((err, caught) => {
        console.log('Error:', err);
        return throwError(() => new Error(errorMessage))
      })
    )
  }
}
