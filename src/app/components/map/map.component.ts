import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @Input() parentForm!: FormGroup;
  @Input() mapaDeshabilitado!: boolean;
  private map!: L.Map;
  private marker!: L.Marker;
  private direccion: any;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Obtén las coordenadas del formulario, si existen
    const lat = this.parentForm.get('latitud')?.value || -17.3952;
    const lng = this.parentForm.get('longitud')?.value || -66.1391;
    const pais = this.parentForm.get('pais')?.value || 'Bolivia';
    const departamento = this.parentForm.get('departamento')?.value || 'Cochabamba';
  
    // Inicializa el mapa con las coordenadas obtenidas o por defecto
    this.map = L.map('map', {
      center: [lat, lng],
      zoom: 18
    });
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    
    // Agrega un marcador con las coordenadas iniciales
    this.marker = L.marker([lat, lng], { draggable: true }).addTo(this.map);

    this.updateMarkerPosition(lat, lng, pais, departamento);
    this.marker.bindPopup('¡Estás aquí!').openPopup();
  
    // Actualiza el valor en el formulario cuando se hace clic en el mapa
    if (!this.mapaDeshabilitado) {
      this.map.on('click', (event: any) => {
        var dpto =this.direccion.state;
        var pais = this.direccion.country;
        this.updateMarkerPosition(event.latlng.lat, event.latlng.lng, pais, dpto);
      });
    }
    
  }
  

  private updateMarkerPosition(lat: number, lng: number, pais: string, departamento: string): void {
    this.marker.setLatLng([lat, lng]);
    this.getAddress(lat, lng);
    this.parentForm.get('latitud')?.setValue(lat);
    this.parentForm.get('longitud')?.setValue(lng);
    this.parentForm.get('pais')?.setValue(pais);
    this.parentForm.get('departamento')?.setValue(departamento);
    this.parentForm.get('ubicacionRestaurante')?.setValue(this.direccion ? this.direccion.display_name : '');
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
