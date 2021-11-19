import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckupDialogComponent } from './checkup-dialog.component';

describe('CheckupDialogComponent', () => {
  let component: CheckupDialogComponent;
  let fixture: ComponentFixture<CheckupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
