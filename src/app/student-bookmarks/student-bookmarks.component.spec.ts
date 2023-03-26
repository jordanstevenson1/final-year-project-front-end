import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBookmarksComponent } from './student-bookmarks.component';

describe('StudentBookmarksComponent', () => {
  let component: StudentBookmarksComponent;
  let fixture: ComponentFixture<StudentBookmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentBookmarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentBookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
