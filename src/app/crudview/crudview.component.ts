import { Component, OnInit } from '@angular/core';
import { Place } from "../shared/place";
import { CrudService } from "../shared/crud.service";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-crudview',
  templateUrl: './crudview.component.html',
  styleUrls: ['./crudview.component.css']
})
export class CrudviewComponent implements OnInit {

  p: number = 1;
  place: Place[];
  places: Observable<any>
  constructor(
    private crudApi: CrudService,
    private router: Router,
    firestore: AngularFirestore
  ) {
    this.places = firestore.collection('items').valueChanges();
  }

  ngOnInit(): void {
    let s = this.crudApi.getPlacesList();
    s.snapshotChanges().subscribe(data => {
      this.place = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a!['$key'] = item.key;
        this.place.push(a as Place);
      })
    })
  }


  deletePlace(place: any) {
    this.crudApi.deletePlace(place.$key)
  }

  goMap() {
    this.router.navigate([''])
  }
}