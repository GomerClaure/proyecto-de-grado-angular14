import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNotificacionComponent } from './lista-notificacion.component';

describe('ListaNotificacionComponent', () => {
  let component: ListaNotificacionComponent;
  let fixture: ComponentFixture<ListaNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaNotificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
