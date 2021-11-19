import { EventEmitter, Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  IHttpConnectionOptions,
} from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<Boolean>();
  newMsg = new EventEmitter<string>();

  private connectionIsEstablished = false;

  public _hubConnection: HubConnection;
  public options: IHttpConnectionOptions;
  constructor() {
    this.createConnection();
  }

  sendMessage(message: Message) {
    if (this._hubConnection != undefined)
      this._hubConnection.invoke('NewMessage', message);
  }
  sendID(message: string) {
    if (this._hubConnection != undefined)
      this._hubConnection.invoke('Newid', message);
  }

  private createConnection() {
    let Token = sessionStorage.getItem('TokenInfo');
    if (Token != undefined) {
      var x = JSON.parse(Token);
      const userToken = x.token;
      this.options = {
        transport: signalR.HttpTransportType.LongPolling,
        skipNegotiation: false,
        accessTokenFactory: () => {
          var t = sessionStorage.getItem('TokenInfo');

          console.log(userToken);
          return userToken;
        },
      };
      this._hubConnection = new HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Information)
        .withUrl('http://localhost:51273/MessageHub', this.options)
        .build();
      console.log(this._hubConnection);
      this.registerOnServerEvents();
      this.startConnection();
    }
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch((err) => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(function () {
          this.startConnection();
        }, 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('MessageReceived', (data: any) => {
      this.messageReceived.emit(data);
    });
    this._hubConnection.on('newMsg', (data: any) => {
      this.newMsg.emit(data);
    });
  }
}
