import { TestBed } from '@angular/core/testing';

import { PatientEditProfileService } from './patient-edit-profile.service';

describe('PatientEditProfileService', () => {
  let service: PatientEditProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientEditProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
