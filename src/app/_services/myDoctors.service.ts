import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DoctorModel } from '../_Models/Doctor.model';

@Injectable({
  providedIn: 'root',
})
export class myDoctorsService {
  drArr: DoctorModel[] = [];

  getMyDoctors() {
    return this.http.get<DoctorModel[]>(
      'http://localhost:51273/test/mydoctors'
    );
  }
  unfollowDr(dr_id: number) {
    return this.http.get<boolean>(
      'http://localhost:51273/rest/unfollowdr/' + dr_id
    );
  }
  updateAccess(followID: number, status: number) {
    return this.http.post<DoctorModel>(
      'http://localhost:51273/rest/access_medinfo/' + status,
      followID
    );
  }
  constructor(private http: HttpClient) {}
}
