import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentApplyJobComponent } from './student-apply-job.component';

describe('StudentApplyJobComponent', () => {
  let component: StudentApplyJobComponent;
  let fixture: ComponentFixture<StudentApplyJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentApplyJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentApplyJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
