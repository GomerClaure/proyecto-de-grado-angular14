import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarEstadoPedidoComponent } from './cambiar-estado-pedido.component';

describe('CambiarEstadoPedidoComponent', () => {
  let component: CambiarEstadoPedidoComponent;
  let fixture: ComponentFixture<CambiarEstadoPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarEstadoPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarEstadoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
