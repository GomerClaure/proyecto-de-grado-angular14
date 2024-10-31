import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallePedidoComponent } from './modal-detalle-pedido.component';

describe('ModalPedidoComponent', () => {
  let component: ModalDetallePedidoComponent;
  let fixture: ComponentFixture<ModalDetallePedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetallePedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetallePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
