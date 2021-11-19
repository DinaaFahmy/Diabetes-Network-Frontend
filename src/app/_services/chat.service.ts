import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

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
export class ChatService {
  public ChatUrl: string;

  constructor(private http: HttpClient, public token: TokenService) {
    this.ChatUrl = environment.url + 'Chat/chat/';
  }

  getChat(id: number): Observable<any> {
    return this.http.get<any>(this.ChatUrl + id);
  }
  getChats(): Observable<any> {
    let a = this.token.gettoken();
    console.log(a);
    if (a != undefined) return this.http.get<any>(this.ChatUrl);
  }
  addMsg(id: any, content: string, recevied: number) {
    return this.http.post<any>(
      this.ChatUrl + id + '/' + recevied,
      JSON.stringify(content),
      httpOptions
    );
  }
  getName(id: number): Observable<any> {
    return this.http.get<any>(environment.url + 'Chat/name/' + id);
  }
}
