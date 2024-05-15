import { TestBed } from '@angular/core/testing';

import { CreationPrescripteurService } from './CreationPrescripteur.service';

describe('CreationPrescripteurService', () => {
  let service: CreationPrescripteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreationPrescripteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
