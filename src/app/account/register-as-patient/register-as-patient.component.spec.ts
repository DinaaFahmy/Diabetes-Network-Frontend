import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAsPatientComponent } from './register-as-patient.component';

describe('RegisterAsPatientComponent', () => {
  let component: RegisterAsPatientComponent;
  let fixture: ComponentFixture<RegisterAsPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAsPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
