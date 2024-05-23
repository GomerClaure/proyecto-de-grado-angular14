import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPedidoComponent } from './modal-pedido.component';

describe('ModalPedidoComponent', () => {
  let component: ModalPedidoComponent;
  let fixture: ComponentFixture<ModalPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
