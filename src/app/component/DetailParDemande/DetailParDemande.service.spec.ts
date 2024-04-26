import { TestBed } from '@angular/core/testing';

import { TesteService } from './DetailParDemande.service';

describe('TesteService', () => {
  let service: TesteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TesteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
