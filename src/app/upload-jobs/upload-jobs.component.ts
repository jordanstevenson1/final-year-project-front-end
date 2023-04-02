import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-upload-jobs',
  templateUrl: './upload-jobs.component.html',
  styleUrls: ['./upload-jobs.component.css']
})
export class UploadJobsComponent {
  selectedFile: File | null = null;

  constructor(private webService: WebService, private authService: AuthService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile as File, this.selectedFile.name);
    const userId = this.authService.getUserId();
    if (userId) {
      formData.append('user_id', String(userId)); // Add the user ID to the FormData object
    }

    this.webService.uploadJobsCSV(formData).subscribe(
      (response) => {
        console.log('Jobs uploaded successfully');
        alert('Jobs uploaded successfully');
      },
      (error) => {
        console.error('Error uploading jobs:', error);
        alert('Error uploading jobs: ' + error.message);
      }
    );
  }
}
