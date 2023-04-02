import { Component } from '@angular/core';

@Component({
  selector: 'app-interview-tips',
  templateUrl: './interview-tips.component.html',
  styleUrls: ['./interview-tips.component.css']
})
export class InterviewTipsComponent {

  tips = [
    {
      title: 'Research the company',
      description: 'Before applying to any job, it\'s important to do your research on the company. This includes reading up on the company\'s history, culture, and recent news. This will help you tailor your application to the company and also prepare for any interview questions related to the company.'
    },
    {
      title: 'Review the job description',
      description: 'Read the job description thoroughly and make sure you understand the responsibilities, requirements, and qualifications for the job. This will help you tailor your application and prepare for any interview questions related to the job.'
    },
    {
      title: 'Practice your interview skills',
      description: 'Practice your interview skills with friends, family, or a career counselor. This will help you feel more comfortable and confident during the actual interview.'
    },
    {
      title: 'Prepare answers to common interview questions',
      description: 'Research common interview questions and prepare answers to them. This will help you feel more prepared and confident during the interview.'
    },
    {
      title: 'Bring a portfolio',
      description: 'If applicable, bring a portfolio of your work to the interview. This will help you showcase your skills and experience.'
    },
    {
      title: 'Dress appropriately',
      description: 'Dress professionally for the interview, even if it\'s a virtual interview. This will help you make a good first impression.'
    },
    {
      title: 'Follow up after the interview',
      description: 'Send a thank-you note or email to the interviewer after the interview to show your appreciation and interest in the job.'
    }
  ];

}
