import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPedidoCComponent } from './registrar-pedido-c.component';

describe('RegistrarPedidoCComponent', () => {
  let component: RegistrarPedidoCComponent;
  let fixture: ComponentFixture<RegistrarPedidoCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPedidoCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPedidoCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
