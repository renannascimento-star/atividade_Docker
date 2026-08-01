import { TestBed } from '@angular/core/testing';

import { ConvenioApi } from './convenio-api';

describe('ConvenioApi', () => {
  let service: ConvenioApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvenioApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
