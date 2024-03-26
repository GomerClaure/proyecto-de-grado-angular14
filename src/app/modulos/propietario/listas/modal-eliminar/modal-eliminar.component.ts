import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.scss']
})
export class ModalEliminarComponent{ 

  constructor() { }
  eliminarPlatillo(){
    console.log("Platillo eliminado")
  }

}
