import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManejoCuentaEmpleadoComponent } from './manejo-cuenta-empleado.component';

describe('ManejoCuentaPersonalComponent', () => {
  let component: ManejoCuentaEmpleadoComponent;
  let fixture: ComponentFixture<ManejoCuentaEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManejoCuentaEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManejoCuentaEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
