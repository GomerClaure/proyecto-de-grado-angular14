import { TestBed } from '@angular/core/testing';

import { UnauthErrorInterceptor } from './unauth-error.interceptor';

describe('UnauthErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UnauthErrorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UnauthErrorInterceptor = TestBed.inject(UnauthErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
