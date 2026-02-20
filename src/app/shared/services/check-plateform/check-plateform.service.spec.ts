import { TestBed } from '@angular/core/testing';

import { CheckPlateformService } from './check-plateform.service';

describe('CheckPlateformService', () => {
  let service: CheckPlateformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckPlateformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
