import { Component, OnInit, NgZone } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { SignalRService } from 'src/app/_services/signal-r.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export class BaseComponent implements OnInit {
  title = 'ClientApp';
  txtMessage: string = '';
  uniqueID: string = new Date().getTime().toString();
  messages = new Array<Message>();
  message = new Message();
  constructor(private chatService: SignalRService, private _ngZone: NgZone) {
    this.subscribeToEvents();
  }
  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.clientuniqueid = this.uniqueID;
      this.message.type = 'sent';
      this.message.message = this.txtMessage;
      this.message.date = new Date();
      this.messages.push(this.message);
      this.chatService.sendMessage(this.message);
      this.txtMessage = '';
    }
  }
  sendID(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.clientuniqueid = this.uniqueID;
      this.message.type = 'sent';
      this.message.message = this.txtMessage;
      this.message.date = new Date();
      this.chatService.sendID(this.message.message);
      this.txtMessage = '';
    }
  }
  private subscribeToEvents(): void {
    this.chatService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        if (message.clientuniqueid !== this.uniqueID) {
          message.type = 'received';
          this.messages.push(message);
          console.log(this.messages);
        }
      });
    });
  }

  ngOnInit(): void {}
}
