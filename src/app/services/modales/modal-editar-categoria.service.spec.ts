import { TestBed } from '@angular/core/testing';

import { ModalEditarCategoriaService } from './modal-editar-categoria.service';

describe('ModalEditarCategoriaService', () => {
  let service: ModalEditarCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalEditarCategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
