import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugDialogComponent } from './drug-dialog.component';

describe('DrugDialogComponent', () => {
  let component: DrugDialogComponent;
  let fixture: ComponentFixture<DrugDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
