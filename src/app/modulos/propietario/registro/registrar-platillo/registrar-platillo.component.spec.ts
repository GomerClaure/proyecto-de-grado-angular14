import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPlatilloComponent } from './registrar-platillo.component';

describe('RegistrarPlatilloComponent', () => {
  let component: RegistrarPlatilloComponent;
  let fixture: ComponentFixture<RegistrarPlatilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPlatilloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPlatilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
