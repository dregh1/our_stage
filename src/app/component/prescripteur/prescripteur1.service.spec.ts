import { TestBed } from '@angular/core/testing';

import { Prescripteur1Service } from './prescripteur1.service';

describe('Prescripteur1Service', () => {
  let service: Prescripteur1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Prescripteur1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
