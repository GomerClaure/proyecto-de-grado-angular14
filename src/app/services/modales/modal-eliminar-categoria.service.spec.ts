import { TestBed } from '@angular/core/testing';

import { ModalEliminarCategoriaService } from './modal-eliminar-categoria.service';

describe('ModalEliminarCategoriaService', () => {
  let service: ModalEliminarCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalEliminarCategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
