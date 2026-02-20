import { TestBed } from '@angular/core/testing';

import { FlowbitsService } from './flowbits.service';

describe('FlowbitsService', () => {
  let service: FlowbitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowbitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
