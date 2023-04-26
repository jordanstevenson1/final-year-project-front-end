import { Component, OnInit } from '@angular/core';
import { WebService, StudentProfile } from '../web.service';

@Component({
  selector: 'student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  studentProfile!: StudentProfile;
  editMode = false;

  constructor(private webService: WebService) { }

  ngOnInit(): void {
    this.webService.getStudentProfile()
      .subscribe(profile => this.studentProfile = profile);
  }

  toggleEditMode($event: any): void {
    $event.preventDefault();
    this.editMode = !this.editMode;
  }

  submitProfile(): void {
    this.webService.updateStudentProfile(this.studentProfile)
      .subscribe(
        response => {
          console.log('Profile updated successfully');
          this.editMode = false;
        },
        error => console.error('Error updating profile:', error)
      );
  }

}
