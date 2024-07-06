import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaPedidosComponent } from './plantilla-pedidos.component';

describe('PlantillaPedidosComponent', () => {
  let component: PlantillaPedidosComponent;
  let fixture: ComponentFixture<PlantillaPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaPedidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
