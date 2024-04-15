import { Component, OnInit } from '@angular/core';
import { DescripcionPedidoService } from 'src/app/services/detalle-pedido/descripcion-pedido.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-modal-pedido',
  templateUrl: './modal-pedido.component.html',
  styleUrls: ['./modal-pedido.component.scss']
})
export class ModalPedidoComponent implements OnInit {
  descripcion: string = '';
  constructor(private descripcionPedidoService:DescripcionPedidoService) { }

  ngOnInit(): void {
        
  } 
  agregarDescripcion() {
    this.descripcionPedidoService.addDescripcion(this.descripcion)
    this.descripcion = ''; 
  }
} 
