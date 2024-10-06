import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManejoCuentaPersonalComponent } from './manejo-cuenta-personal.component';

describe('ManejoCuentaPersonalComponent', () => {
  let component: ManejoCuentaPersonalComponent;
  let fixture: ComponentFixture<ManejoCuentaPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManejoCuentaPersonalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManejoCuentaPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
