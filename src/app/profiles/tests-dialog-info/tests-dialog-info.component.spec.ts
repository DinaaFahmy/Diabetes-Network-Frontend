import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsDialogInfoComponent } from './tests-dialog-info.component';

describe('TestsDialogInfoComponent', () => {
  let component: TestsDialogInfoComponent;
  let fixture: ComponentFixture<TestsDialogInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsDialogInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsDialogInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
