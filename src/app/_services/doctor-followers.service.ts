import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { DrFollowers } from './../_Models/dr-followers.model';
import { AccountService } from './../_services/account.service';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  observe: 'response',
};

@Injectable({
  providedIn: 'root',
})
export class DoctorFollowersService {
  readonly rootURL = 'http://localhost:51273';

  constructor(private http: HttpClient, public accserv: AccountService) {}

  getAllDrFollowers() {
    // return this.http.get<DoctorFollowers[]>(this.rootURL+"/rest/getpatients");
    //console.log("hello to followers " + this.http.get<DoctorFollowers[]>("http://localhost:51273/rest/getpatients"));
    return this.http.get<DrFollowers[]>(this.rootURL + '/rest/getpatients');
  }
}
