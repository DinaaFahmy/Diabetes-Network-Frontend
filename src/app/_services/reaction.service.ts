import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactionModel } from '../_models/Reactions.model';

@Injectable({
  providedIn: 'root',
})
export class ReactionService {
  reactArr: ReactionModel[] = [];

  getReactions() {
    return this.http.get<ReactionModel[]>('http://localhost:51273/rest/react');
  }
  constructor(private http: HttpClient) {}
}
