import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarCategoriaComponent } from './modal-eliminar-categoria.component';

describe('ModalEliminarCategoriaComponent', () => {
  let component: ModalEliminarCategoriaComponent;
  let fixture: ComponentFixture<ModalEliminarCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEliminarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
