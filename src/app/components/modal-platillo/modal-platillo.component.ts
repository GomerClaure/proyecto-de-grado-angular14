import { Component, OnInit } from '@angular/core';
import { ModalMostrarPlatilloService } from 'src/app/services/modales/modal-mostrar-platillo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-platillo',
  templateUrl: './modal-platillo.component.html',
  styleUrls: ['./modal-platillo.component.scss']
})


export class ModalPlatilloComponent implements OnInit {
  public baseUrl = environment.backendStorageUrl;
  public imageUrl='';
  platillo: any;
  constructor(private modalService: ModalMostrarPlatilloService) { 
     this.imageUrl='assets/image/Imagen-rota.jpg'
  }

  ngOnInit(): void {
    this.platillo = this.modalService.getPlatillo(); 
  }
  onError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.imageUrl;
  }
}
