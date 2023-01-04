import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { icon, Marker } from "leaflet";
import * as L from 'leaflet';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {
  results: any[] = [];
  query: string;
  map: any;
  places = [
    { id: "1", name: "Museos en Iquique" },
    { id: "2", name: "Bancos en Iquique" },
    { id: "3", name: "Playas en Iquique" },
    { id: "4", name: "Restaurantes en Iquique" },
    { id: "5", name: "Hoteles en Iquique" },
    { id: "6", name: "Supermercados en Iquique" },
    { id: "7", name: "Restaurantes en Iquique" },
  ]
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.map = L.map('map').setView([-33.4377756, -70.6504502], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  search() {
    const selectedLocationId = (document.getElementById('locationSelector') as HTMLSelectElement).value;
    const selectedLocation = this.places.find(l => l.id == selectedLocationId);
    console.log(`Buscando información sobre ${selectedLocation && selectedLocation.name}...`);

    // Conecta a la API de OpenStreetMap y obtén información del lugar seleccionado
    this.http.get(`https://nominatim.openstreetmap.org/search?q=${selectedLocation && selectedLocation.name}&format=json&polygon=1&addressdetails=1`)
      .subscribe(data => {
        console.log(data);
        const dataArray = Object.values(data);
        // Carga la información en el listado y el mapa
        const iconRetinaUrl = 'assets/marker-icon-2x.png';
        const iconUrl = 'assets/marker-icon.png';
        const shadowUrl = 'assets/marker-shadow.png';
        const iconDefault = icon({
          iconRetinaUrl,
          iconUrl,
          shadowUrl,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41]
        });
        Marker.prototype.options.icon = iconDefault;

        // Vuela al lugar que se encuentra en la posición [0] del array
        this.map.flyTo([dataArray[0].lat, dataArray[0].lon], 14)

        // Agrega un marcador con un breve descripción al lugar en la posición [0] del array, esta información de abre automaticamente
        L.marker([dataArray[0].lat, dataArray[0].lon]).addTo(this.map)
          .bindPopup(`<b>${selectedLocation && selectedLocation.name}</b><br>${dataArray[0].display_name}`)
          .openPopup();

        // Carga un marcador por cada posición del array, genera una descripción, pero esta no se muestra de inmediato
        for (let i = 1; i < dataArray.length; i++) {
          L.marker([dataArray[i].lat, dataArray[i].lon]).addTo(this.map).bindPopup(`<b>${selectedLocation && selectedLocation.name}</b><br>${dataArray[i].display_name}`)

        }
      });
  }
}
