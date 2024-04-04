import { Component, OnInit } from '@angular/core';
import { DescripcionPedidoService } from 'src/app/services/detalle-pedido/descripcion-pedido.service';

@Component({
  selector: 'app-modal-pedido',
  templateUrl: './modal-pedido.component.html',
  styleUrls: ['./modal-pedido.component.scss']
})
export class ModalPedidoComponent implements OnInit {
  descripcion: string = '';
  platilloS:any;
  constructor(private sharedDataService: DescripcionPedidoService) { }

  ngOnInit(): void {
    this.platilloS=this.sharedDataService.getplatilloSeleccionado;

  } 
  agregarDescripcion() {
    console.log(this.platilloS)
    console.log('Descripción guardada:', this.descripcion);
  }
} 
