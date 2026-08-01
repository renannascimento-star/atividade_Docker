import { TestBed } from '@angular/core/testing';

import { ProfissionalApi } from './profissional-api';

describe('ProfissionalApi', () => {
  let service: ProfissionalApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfissionalApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
