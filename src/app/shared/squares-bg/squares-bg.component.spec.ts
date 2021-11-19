import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquaresBgComponent } from './squares-bg.component';

describe('SquaresBgComponent', () => {
  let component: SquaresBgComponent;
  let fixture: ComponentFixture<SquaresBgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquaresBgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquaresBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
