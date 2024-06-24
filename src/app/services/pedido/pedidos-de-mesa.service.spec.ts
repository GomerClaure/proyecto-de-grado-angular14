import { TestBed } from '@angular/core/testing';

import { PedidosDeMesaService } from './pedidos-de-mesa.service';

describe('PedidosDeMesaService', () => {
  let service: PedidosDeMesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidosDeMesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
