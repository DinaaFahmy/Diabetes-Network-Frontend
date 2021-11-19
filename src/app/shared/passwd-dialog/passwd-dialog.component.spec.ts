import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswdDialogComponent } from './passwd-dialog.component';

describe('PasswdDialogComponent', () => {
  let component: PasswdDialogComponent;
  let fixture: ComponentFixture<PasswdDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswdDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
