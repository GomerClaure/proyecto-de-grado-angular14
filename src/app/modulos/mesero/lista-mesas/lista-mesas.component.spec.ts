import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMesasComponent } from './lista-mesas.component';

describe('ListaMesasComponent', () => {
  let component: ListaMesasComponent;
  let fixture: ComponentFixture<ListaMesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaMesasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaMesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
