import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPlatilloComponent } from './lista-platillo.component';

describe('ListaPlatilloComponent', () => {
  let component: ListaPlatilloComponent;
  let fixture: ComponentFixture<ListaPlatilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPlatilloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPlatilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
