import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCategoriaComponent } from './registrar-categoria.component';

describe('RegistrarCategoriaComponent', () => {
  let component: RegistrarCategoriaComponent;
  let fixture: ComponentFixture<RegistrarCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
