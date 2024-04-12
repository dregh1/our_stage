import { TestBed } from '@angular/core/testing';

import { DetailDemandeService } from './detail-demande.service';

describe('DetailDemandeService', () => {
  let service: DetailDemandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailDemandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
