import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfollowersComponent } from './myfollowers.component';

describe('MyfollowersComponent', () => {
  let component: MyfollowersComponent;
  let fixture: ComponentFixture<MyfollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfollowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
