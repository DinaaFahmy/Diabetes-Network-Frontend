import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionModel } from '../_models/Question.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AnswerModel } from '../_Models/answer-model';
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
export class QuestionService {
  // categoryArr: QuestionModel[] = [];
  public DoctorAnsURl: string;
  public UserAnsURl: string;
  public AllAns: string;
  public QuestionsURL: string;

  constructor(private http: HttpClient) {
    this.DoctorAnsURl = environment.url + 'rest/DoctorAns/';
    this.UserAnsURl = environment.url + 'rest/PatientAns/';
    this.AllAns = environment.url + 'rest/AllAns/';
    this.QuestionsURL = environment.url + 'test/GetuserQuestions/';
  }
  getDocAns(id: number): Observable<AnswerModel[]> {
    return this.http.get<AnswerModel[]>(this.DoctorAnsURl + id);
  }
  getUserAns(id: number): Observable<AnswerModel[]> {
    return this.http.get<AnswerModel[]>(this.UserAnsURl + id);
  }
  getAllAns(id: number): Observable<AnswerModel[]> {
    return this.http.get<AnswerModel[]>(this.AllAns + id);
  }
  getmyQuestions() {
    return this.http.get<QuestionModel[]>(this.QuestionsURL);
  }
  addQuestion(dr_id: number, question: string) {
    return this.http.post<QuestionModel>(
      environment.url + 'rest/addQuestion/' + dr_id,
      JSON.stringify(question),
      httpOptions
    );
  }
}
