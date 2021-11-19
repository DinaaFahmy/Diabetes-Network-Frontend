import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeStyleDialogComponent } from './life-style-dialog.component';

describe('LifeStyleDialogComponent', () => {
  let component: LifeStyleDialogComponent;
  let fixture: ComponentFixture<LifeStyleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeStyleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeStyleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
