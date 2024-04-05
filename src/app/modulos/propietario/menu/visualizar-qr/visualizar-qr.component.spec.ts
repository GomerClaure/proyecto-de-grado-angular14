import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarQrComponent } from './visualizar-qr.component';

describe('VisualizarComponent', () => {
  let component: VisualizarQrComponent;
  let fixture: ComponentFixture<VisualizarQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarQrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
