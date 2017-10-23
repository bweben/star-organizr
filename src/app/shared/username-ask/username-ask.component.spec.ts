import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameAskComponent } from './username-ask.component';

describe('UsernameAskComponent', () => {
  let component: UsernameAskComponent;
  let fixture: ComponentFixture<UsernameAskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsernameAskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsernameAskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
