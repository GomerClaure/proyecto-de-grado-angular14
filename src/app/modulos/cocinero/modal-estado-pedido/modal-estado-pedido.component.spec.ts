import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEstadoPedidoComponent } from './modal-estado-pedido.component';

describe('ModalEstadoPedidoComponent', () => {
  let component: ModalEstadoPedidoComponent;
  let fixture: ComponentFixture<ModalEstadoPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEstadoPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEstadoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
