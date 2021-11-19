import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { patientEditModel } from '../_Models/PatienttEditModel';

@Injectable({
  providedIn: 'root',
})
export class PatientEditProfileService {
  public MyProfilePatientUrl: string;
  constructor(private http: HttpClient) {
    this.MyProfilePatientUrl = environment.url + 'rest/MyprofilePatient';
  }
  GetMyProfile(): Observable<patientEditModel> {
    return this.http.get<patientEditModel>(this.MyProfilePatientUrl);
  }
  UpdateMyProfile(p: patientEditModel): Observable<patientEditModel> {
    return this.http.put<patientEditModel>(this.MyProfilePatientUrl, p);
  }
}
