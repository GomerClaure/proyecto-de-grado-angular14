import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlatilloComponent } from './modal-platillo.component';

describe('ModalPlatilloComponent', () => {
  let component: ModalPlatilloComponent;
  let fixture: ComponentFixture<ModalPlatilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPlatilloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPlatilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
