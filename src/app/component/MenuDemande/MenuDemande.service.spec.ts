import { TestBed } from '@angular/core/testing';

import { MenuDemandeService } from './MenuDemande.service';

describe('MenuDemandeService', () => {
  let service: MenuDemandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuDemandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
