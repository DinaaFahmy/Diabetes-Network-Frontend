import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './../_services/account.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PatientProfile } from '../_models/patient-profile.model';
import { PatientPosts } from '../_models/patient-posts.model';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  observe: 'response',
};

@Injectable({
  providedIn: 'root',
})
export class PatientProfileService {
  readonly rootURL = 'http://localhost:51273';
  constructor(
    private http: HttpClient,
    private router: Router,
    public accserv: AccountService
  ) {}

  getPatientProfileData(id) {
    return this.http.get<PatientProfile>(
      this.rootURL + '/rest/myfollowers/' + id
    );
  }

  getPatientPostsData(id) {
    return this.http.get<PatientPosts[]>(
      this.rootURL + '/test/patientposts/' + id
    );
  }
  getpatientprofile(id) {
    return this.http.get<any>(this.rootURL + '/rest/patient/' + id);
  }
  getpatientcheckups(id) {
    return this.http.get<any>(this.rootURL + '/rest/patientCheckups/' + id);
  }
}
