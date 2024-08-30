import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.scss']
})
export class PasoDosComponent implements OnInit, AfterViewInit {

  @Input() pasoDosForm!: FormGroup;
  private map!: L.Map;
  private marker!: L.Marker;
  private direccion: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-17.3952, -66.1391],
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.map.on('click', (event: any) => {
      this.updateMarkerPosition(event.latlng.lat, event.latlng.lng);
    });

    this.marker = L.marker([-17.3952, -66.1391], { draggable: true }).addTo(this.map);
    this.updateMarkerPosition(-17.3952, -66.1391);
    this.marker.bindPopup('¡Estás en Cochabamba!').openPopup();
  }

  private updateMarkerPosition(lat: number, lng: number): void {
    this.marker.setLatLng([lat, lng]);
    this.getAddress(lat, lng);
    console.log('Latitud:', lat, 'Longitud:', lng);
    this.pasoDosForm.get('ubicacionRestaurante')?.setValue(this.direccion ? this.direccion.display_name : '');
  }

  private getAddress(lat: number, lng: number): void {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    this.http.get(url).subscribe((data: any) => {
      this.direccion = data.address;
      const streetName = this.direccion.road || this.direccion.city || this.direccion.state;
      this.marker.bindPopup('¡Estás en ' + streetName).openPopup();
    }, error => {
      console.error('Error al obtener la dirección:', error);
    });
  }
}
