import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPedidosCComponent } from './mostrar-pedidos-c.component';

describe('MostrarPedidosCComponent', () => {
  let component: MostrarPedidosCComponent;
  let fixture: ComponentFixture<MostrarPedidosCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarPedidosCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarPedidosCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
