import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Checkup } from '../_Models/check-up';
import { Test } from '../_Models/test';
import { DrugModel } from '../_Models/Drug-model';
import { DrugSource } from '../_Models/drug-source';
// import { Test } from '../_Models/Test';
@Injectable({
  providedIn: 'root',
})
export class PatientService {
  public CheckupUrl: string;
  public DeleteCheckupUrl: string;
  public TestUrl: string;
  public DrugUrl: string;
  constructor(private http: HttpClient) {
    this.CheckupUrl = environment.url + 'rest/checkups';
    this.DeleteCheckupUrl = environment.url + 'rest/deletecheckups';
    this.TestUrl = environment.url + 'rest/test';
    this.DrugUrl = environment.url + 'rest/drugs';
  }
  getCheckups(): Observable<Checkup[]> {
    return this.http.get<Checkup[]>(this.CheckupUrl);
  }
  updateCheckup(c: Checkup): Observable<Checkup> {
    return this.http.put<Checkup>(this.CheckupUrl, c);
  }
  addCheckup(c: Checkup): Observable<Checkup> {
    return this.http.post<Checkup>(this.CheckupUrl, c);
  }
  deleteCheckup(c: Checkup): Observable<Checkup> {
    return this.http.put<Checkup>(this.DeleteCheckupUrl, c);
  }

  getTest(): Observable<Test[]> {
    return this.http.get<Test[]>(this.TestUrl);
  }

  addTest(t: Test): Observable<Test> {
    return this.http.post<Test>(this.TestUrl, t);
  }
  getDrugs(): Observable<DrugSource[]> {
    return this.http.get<DrugSource[]>(this.DrugUrl);
  }

  getTests(type: number): Observable<any> {
    return this.http.get<any>('http://localhost:51273/rest/getmytests/' + type);
  }
  getTestsfordoc(id: number, type: number): Observable<any> {
    return this.http.get<any>(
      'http://localhost:51273/rest/gettests/' + id + '/' + type
    );
  }
  deletetest(x: any) {
    return this.http.post<any>('http://localhost:51273/rest/Deletetest', x);
  }
}
