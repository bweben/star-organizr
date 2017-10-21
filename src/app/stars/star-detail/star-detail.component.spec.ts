import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarDetailComponent } from './star-detail.component';

describe('StarDetailComponent', () => {
  let component: StarDetailComponent;
  let fixture: ComponentFixture<StarDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
