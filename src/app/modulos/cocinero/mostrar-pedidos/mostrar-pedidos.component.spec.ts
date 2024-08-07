import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPedidosComponent } from './mostrar-pedidos.component';

describe('MostrarPedidosComponent', () => {
  let component: MostrarPedidosComponent;
  let fixture: ComponentFixture<MostrarPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarPedidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
