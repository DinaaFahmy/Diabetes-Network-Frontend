import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserModel } from '../_Models/user.model';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  observe: 'response',
};

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  readonly rootURL = "http://localhost:51273";

  constructor(private http:HttpClient) { }

  public search(term){
    return this.http.get<UserModel[]>('http://localhost:51273/rest/getAllUsers');

  }
}
