import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterAsDoctorModel } from '../_models/RegisterAsDoctor.model';
import { RegisterAsPatientModel } from '../_models/RegisterAsPatient.model';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';

import { LoginModel } from '../_models/Login.model';
import { map } from 'rxjs/operators';


var headers_object = new HttpHeaders({
  'Content-Type': 'application/json',
});

const httpOptions = {
  headers: headers_object,
};

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  readonly rootURL = 'http://localhost:51273';
  constructor(private http: HttpClient, private router: Router) {}
  RegisterAsDoctor(regModel: RegisterAsDoctorModel) {
    return this.http.post<RegisterAsDoctorModel>(
      'http://localhost:51273/Account/RegisterAsDoctor',
      regModel
    ).pipe(
      map((user) => {
        return user;
      }));
  }
  RegisterAsPatient(regModel: RegisterAsPatientModel) {

    return this.http.post<RegisterAsPatientModel>(
      'http://localhost:51273/Account/RegisterAsPatient',
      regModel
    ).pipe(
      map((user) => {
        return user;
      }));
  }
  Login(logModel: LoginModel) {
    // var header_ = new Headers ({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http
      .post<LoginModel>('http://localhost:51273/Account/loginn', logModel)
      .pipe(
        map((user) => {
          if (user) {
            sessionStorage.setItem('TokenInfo', JSON.stringify(user));
          }
        return user;
        })
      );
  }

  EmailExist(email:string){
          return this.http.post<boolean>("http://localhost:51273/Account/EmailExist", JSON.stringify(email),
          httpOptions);
  }

  Emailconfirmed(email:string)
  {
    return this.http.post<boolean>("http://localhost:51273/Account/Emailconfirmed", JSON.stringify(email),
    httpOptions);
  }

  loggedin() {
    return !!sessionStorage.getItem('TokenInfo');
  }
  getToken() {
    return sessionStorage.getItem('TokenInfo');
  }
  logout() {
    sessionStorage.removeItem('TokenInfo');
    this.router.navigate(['/']);
  }
}
