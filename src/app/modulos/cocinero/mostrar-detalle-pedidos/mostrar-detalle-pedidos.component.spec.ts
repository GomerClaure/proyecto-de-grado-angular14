import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarDetallePedidosComponent } from './mostrar-detalle-pedidos.component';

describe('MostrarDetallePedidosComponent', () => {
  let component: MostrarDetallePedidosComponent;
  let fixture: ComponentFixture<MostrarDetallePedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarDetallePedidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarDetallePedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
