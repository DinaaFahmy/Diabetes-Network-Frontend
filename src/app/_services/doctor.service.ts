import { Injectable } from '@angular/core';
import { DoctorinfoModel } from '../_Models/doctorinfo-model';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { CertificateModel } from '../_Models/certificate-model';
import { AnswerModel } from '../_Models/answer-model';
import { commentModel } from '../_models/comment.model';
import { passModel } from '../_Models/pass.model';

var headers_object = new HttpHeaders({
  'Content-Type': 'application/json',
  // 'Authorization': "Bearer "+
});

const httpOptions = {
  headers: headers_object,
};

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient, private router: Router) {}

  loggedin() {
    return !!localStorage.getItem('TokenInfo');
  }

  logout() {
    localStorage.removeItem('TokenInfo');
    // this.router.navigate(['/home']);
  }

  getdocinfo() {
    return this.http.get<any>('http://localhost:51273/rest/doctor');
  }

  getdocinfoForUser(doctorid: number) {
    return this.http.get<any>(
      'http://localhost:51273/test/GetDoctorInfo/' + doctorid
    );
  }
  getdocpostsForUser(doctorid: number) {
    return this.http.get<any>(
      'http://localhost:51273/test/GetDoctorPosts/' + doctorid
    );
  }
  Getuserid()
  {
    return this.http.get<number>('http://localhost:51273/rest/Getuserid');
  }
  getdocquestionsForUser(doctorid: number) {
    return this.http.get<any>(
      'http://localhost:51273/test/GetDoctorQuestions/' + doctorid
    );
  }
  getdocMentionquestions() {
    return this.http.get<any>('http://localhost:51273/test/MentionedQuestions');
  }
  updatephone(phone: string) {
    return this.http.post<string>(
      'http://localhost:51273/rest/updatephonenumber',
      JSON.stringify(phone),
      httpOptions
    );
  }
  updateaddress(add: string) {
    return this.http.post(
      'http://localhost:51273/rest/updateAddress',
      JSON.stringify(add),
      httpOptions
    );
  }
  Addcertificate(cer: CertificateModel) {
    return this.http.post<CertificateModel>(
      'http://localhost:51273/rest/Addecertificate',
      cer,
      httpOptions
    );
  }
  Addanswer(answer: string, qusid: number) {
    return this.http.post<any>(
      'http://localhost:51273/test/Answer/' + qusid,
      JSON.stringify(answer),
      httpOptions
    );
  }

  Addcomment(comment: commentModel) {
    return this.http.post<any>(
      'http://localhost:51273/rest/comments',
      comment,
      httpOptions
    );
  }
  changepass(password: passModel) {
    return this.http.post<any>(
      'http://localhost:51273/rest/Updatedoctorpass',
      password,
      httpOptions
    );
  }
  follow(id: number) {
    return this.http.get<any>(
      'http://localhost:51273/rest/followdr/' + id + '/' + 3
    );
  }
  unfollow(id: number) {
    return this.http.get<any>('http://localhost:51273/rest/unfollowdr/' + id);
  }
  iffollowhim(id: number) {
    return this.http.get<any>('http://localhost:51273/rest/isfollowhim/' + id);
  }
  passtrue(pass: string) {
    return this.http.post<boolean>(
      'http://localhost:51273/rest/ispasstrue',
      JSON.stringify(pass),
      httpOptions
    );
  }
  deletecomment(commid)
{
  return this.http.delete('http://localhost:51273/rest/comments/'+ commid);
}
deletepost(postid)
{
  return this.http.delete('http://localhost:51273/rest/Deletepost/'+ postid);
}

Deletequestion(qustid)
{
  return this.http.delete('http://localhost:51273/rest/Deletequestion/'+ qustid);
}
DeleteAnswer(ansid)
{
  return this.http.delete('http://localhost:51273/rest/DeleteAnswer/'+ ansid);
}
}
