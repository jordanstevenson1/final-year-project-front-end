import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadJobsComponent } from './upload-jobs.component';

describe('UploadJobsComponent', () => {
  let component: UploadJobsComponent;
  let fixture: ComponentFixture<UploadJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
