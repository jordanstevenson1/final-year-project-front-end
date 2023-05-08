import { Component, ViewChild, ElementRef } from '@angular/core';
import { WebService } from '../web.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-upload-jobs',
  templateUrl: './upload-jobs.component.html',
  styleUrls: ['./upload-jobs.component.css']
})
export class UploadJobsComponent {
  selectedFile: File | null = null;
  uploadSuccess: string | null = null;
  uploadError: string | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private webService: WebService, private authService: AuthService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.uploadSuccess = null;
    this.uploadError = null;

    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile as File, this.selectedFile.name);
    const userId = this.authService.getUserId();
    if (userId) {
      formData.append('user_id', String(userId));
    }

    this.webService.uploadJobsCSV(formData).subscribe(
      (response) => {
        console.log('Jobs uploaded successfully');
        this.uploadSuccess = 'Jobs uploaded successfully';
        this.resetFileInput();
      },
      (error) => {
        console.error('Error uploading jobs:', error);
        this.uploadError = 'Error uploading jobs: ' + error.message;
        this.resetFileInput();
      }
    );
  }

  resetFileInput() {
    this.selectedFile = null;
    this.fileInput.nativeElement.value = '';
  }
}
