import { Component, OnInit } from '@angular/core';
import { WebService, StudentProfile } from '../web.service';

@Component({
  selector: 'student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  studentProfile!: StudentProfile;

  constructor(private webService: WebService) { }

  ngOnInit(): void {
    this.webService.getStudentProfile()
      .subscribe(profile => this.studentProfile = profile);
  }

}
