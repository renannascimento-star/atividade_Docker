import { TestBed } from '@angular/core/testing';

import { AtendimentoApi } from './atendimento-api';

describe('AtendimentoApi', () => {
  let service: AtendimentoApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtendimentoApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
