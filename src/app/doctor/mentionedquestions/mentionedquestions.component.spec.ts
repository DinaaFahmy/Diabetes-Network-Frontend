import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionedquestionsComponent } from './mentionedquestions.component';

describe('MentionedquestionsComponent', () => {
  let component: MentionedquestionsComponent;
  let fixture: ComponentFixture<MentionedquestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentionedquestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentionedquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
