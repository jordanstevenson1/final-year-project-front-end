import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterManageApplicationsComponent } from './recruiter-manage-applications.component';

describe('RecruiterManageApplicationsComponent', () => {
  let component: RecruiterManageApplicationsComponent;
  let fixture: ComponentFixture<RecruiterManageApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterManageApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterManageApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
