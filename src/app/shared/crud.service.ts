import { Injectable } from '@angular/core';
import { Place } from "../shared/place";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  placesRef: AngularFireList<any>;
  placeRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  addPlace(place: Place) {
    this.placesRef.push({
      name: place.placeName
    })
  }

  getPlace(id: string) {
    this.placeRef = this.db.object('places-list' + id);
    return this.placeRef
  }

  getPlacesList() {
    this.placesRef = this.db.list('places-list');
    return this.placesRef;
  }

  deletePlace(id: string) {
    this.placeRef = this.db.object('places-list' + id);
    this.placeRef.remove();
  }


}
