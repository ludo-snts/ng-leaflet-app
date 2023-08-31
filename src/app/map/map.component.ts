import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  private map!: L.Map; // Utilisation du non-null assertion operator

  private initMap(): void {
    this.map = L.map('map', {
      center: [42.695648193359375, 2.889158010482788],
      zoom: 15
    });

    // tile layer de base sur leaflet
    // const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 18,
    //   minZoom: 3,
    // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // });

    // tile layer custom (CartoDB.VoyagerLabelsUnder) voir http://leaflet-extras.github.io/leaflet-providers/preview/index.html
    const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      minZoom: 2,
    });

    // ajout de la localisation de l'utilisateur au chargement de la page (si l'utilisateur accepte la géolocalisation) sinon se positionne sur les coordonnées par défaut : OK
    this.map.locate({ setView: true, maxZoom: 16 });

    // ajout du marqueur de la position de l'utilisateur sur la carte (géolocalisation)
    this.map.on('locationfound', (e: L.LocationEvent) => {
      const userMarker = L.marker(e.latlng); // Création d'un marqueur à la position de l'utilisateur
      userMarker.addTo(this.map);
    });



    tiles.addTo(this.map);
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
