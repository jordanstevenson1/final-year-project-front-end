import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterReviewApplicationComponent } from './recruiter-review-application.component';

describe('RecruiterReviewApplicationComponent', () => {
  let component: RecruiterReviewApplicationComponent;
  let fixture: ComponentFixture<RecruiterReviewApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterReviewApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterReviewApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
