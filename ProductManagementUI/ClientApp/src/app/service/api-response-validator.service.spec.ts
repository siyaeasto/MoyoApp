import { TestBed, inject } from '@angular/core/testing';

import { ApiResponseValidatorService } from './api-response-validator.service';

describe('ApiResponseValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiResponseValidatorService]
    });
  });

  it('should be created', inject([ApiResponseValidatorService], (service: ApiResponseValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
