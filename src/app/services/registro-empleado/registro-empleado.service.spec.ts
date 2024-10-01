import { TestBed } from '@angular/core/testing';

import { RegistroEmpleadoService } from './registro-empleado.service';

describe('RegistroEmpleadoService', () => {
  let service: RegistroEmpleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroEmpleadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
