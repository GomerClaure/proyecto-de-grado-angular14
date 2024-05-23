import { TestBed } from '@angular/core/testing';

import { ModalMostrarPlatilloService } from './modal-mostrar-platillo.service';

describe('ModalMostrarPlatilloService', () => {
  let service: ModalMostrarPlatilloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalMostrarPlatilloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
