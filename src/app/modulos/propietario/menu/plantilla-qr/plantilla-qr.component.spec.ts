import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaQrComponent } from './plantilla-qr.component';

describe('PlantillaQrComponent', () => {
  let component: PlantillaQrComponent;
  let fixture: ComponentFixture<PlantillaQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaQrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
