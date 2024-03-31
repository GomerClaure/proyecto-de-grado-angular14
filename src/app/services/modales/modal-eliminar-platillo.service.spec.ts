import { TestBed } from '@angular/core/testing';

import { ModalEliminarPlatilloService } from './modal-eliminar-platillo.service';

describe('ModalEliminarPlatilloService', () => {
  let service: ModalEliminarPlatilloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalEliminarPlatilloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
