import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarComponent } from './generar.component';

describe('GenerarComponent', () => {
  let component: GenerarComponent;
  let fixture: ComponentFixture<GenerarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
