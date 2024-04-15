import { TestBed } from '@angular/core/testing';

import { DescripcionPedidoService } from './descripcion-pedido.service';

describe('DescripcionPedidoService', () => {
  let service: DescripcionPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescripcionPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
