import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCertificatesComponent } from './dialog-certificates.component';

describe('DialogCertificatesComponent', () => {
  let component: DialogCertificatesComponent;
  let fixture: ComponentFixture<DialogCertificatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCertificatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
