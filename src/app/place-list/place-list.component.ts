import { Component, OnInit, Input } from '@angular/core';
import { CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {

  @Input() resultsName: any[] = [];


  constructor(private crudApi: CrudService) { }

  ngOnInit(): void {
  }

  addPlace() {
    for (let i = 0; i < this.resultsName.length; i++) {
      console.log(this.resultsName[i]);
      this.crudApi.addPlace(this.resultsName[i])
    }
  }
}
