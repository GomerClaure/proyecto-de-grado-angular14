import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDatosCuentaComponent } from './modal-datos-cuenta.component';

describe('ModalDatosCuentaComponent', () => {
  let component: ModalDatosCuentaComponent;
  let fixture: ComponentFixture<ModalDatosCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDatosCuentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDatosCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
