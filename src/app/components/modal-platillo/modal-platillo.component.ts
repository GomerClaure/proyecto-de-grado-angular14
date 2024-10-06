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
  platillo: any;
  constructor(private modalService: ModalMostrarPlatilloService) { }

  ngOnInit(): void {
    this.platillo = this.modalService.getPlatillo();
  }

}
