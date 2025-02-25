import { TestBed } from '@angular/core/testing';

import { PreRegistroService } from './pre-registro.service';

describe('PreRegistroService', () => {
  let service: PreRegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreRegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
