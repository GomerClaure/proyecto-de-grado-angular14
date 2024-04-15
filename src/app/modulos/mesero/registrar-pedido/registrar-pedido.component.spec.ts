import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPedidoComponent } from './registrar-pedido.component';

describe('RegistrarPedidoComponent', () => {
  let component: RegistrarPedidoComponent;
  let fixture: ComponentFixture<RegistrarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
