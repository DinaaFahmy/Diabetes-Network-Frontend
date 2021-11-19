import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckUpsInfoDialogComponent } from './check-ups-info-dialog.component';

describe('CheckUpsInfoDialogComponent', () => {
  let component: CheckUpsInfoDialogComponent;
  let fixture: ComponentFixture<CheckUpsInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckUpsInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckUpsInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
