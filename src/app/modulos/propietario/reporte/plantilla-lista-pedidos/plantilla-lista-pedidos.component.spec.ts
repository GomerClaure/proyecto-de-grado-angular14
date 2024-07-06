import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaListaPedidosComponent } from './plantilla-lista-pedidos.component';

describe('PlantillaListaPedidosComponent', () => {
  let component: PlantillaListaPedidosComponent;
  let fixture: ComponentFixture<PlantillaListaPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaListaPedidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaListaPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
