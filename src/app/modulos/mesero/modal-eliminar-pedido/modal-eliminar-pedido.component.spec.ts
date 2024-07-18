import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarPedidoComponent } from './modal-eliminar-pedido.component';

describe('ModalEliminarPedidoComponent', () => {
  let component: ModalEliminarPedidoComponent;
  let fixture: ComponentFixture<ModalEliminarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEliminarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
