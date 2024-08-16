import { TestBed } from '@angular/core/testing';

import { PedidosCocinaService } from './pedidos-cocina.service';

describe('PedidosCocinaService', () => {
  let service: PedidosCocinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidosCocinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
