import { TestBed } from '@angular/core/testing';

import { PlatillosService } from './platillos.service';

describe('PlatillosService', () => {
  let service: PlatillosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatillosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
