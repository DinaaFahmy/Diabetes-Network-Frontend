import { Component, OnInit, ViewEncapsulation, NgZone } from '@angular/core';
import { ChatService } from 'src/app/_services/chat.service';
import { DoctorService } from 'src/app/_services/doctor.service';
import { TokenService } from 'src/app/_services/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SignalRService } from 'src/app/_services/signal-r.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: [
    '../../patient/check-ups/check-ups.component.css',
    '../../patient/check-ups/check-ups.component.scss',
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ChatComponent implements OnInit {
  constructor(
    public serv: ChatService,
    public docserv: DoctorService,
    private token: TokenService,
    public route: ActivatedRoute,
    public router: Router,
    private _Ngzone: NgZone,
    private signalr: SignalRService
  ) {}
  chat: any;
  MyID: any;
  text: string = '';
  id: any;
  myName: string;
  userName: string;
  chats: any;
  ngOnInit(): void {
    //   this.id = this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe((a) => {
      console.log(a);
      this.id = a.get('id');
      this.serv.getName(this.id).subscribe((a) => {
        this.userName = a;
        console.log(a);

        console.log(this.userName);
        this.myName = this.token.getUserName();
      });
      this.serv.getChat(this.id).subscribe((a) => {
        this.chat = a;
        console.log(this.chat);
      });
    });

    this.MyID = this.token.getUserId();
    console.log(this.MyID);
    this.serv.getChats().subscribe((a) => (this.chats = a));
    this.subscribeToEvents();
  }
  getcolor(e) {
    if (this.MyID == e) {
      return '#A1D0EA';
    }
    return '#F2F2F2';
  }
  getclass(e) {
    if (this.MyID == e) {
      return 'd-flex justify-content-end justify-content-md-end';
    }
    return 'd-flex justify-content-start justify-content-md-start';
  }
  changestyle(e) {
    if (this.MyID == e) {
      return 'text-align: right;';
    }
    return 'text-align: left;';
  }
  SendMsg() {
    console.log(this.text);
    if (this.text != '') {
      this.serv
        .addMsg(this.chat[0].chatId, this.text, this.id)
        .subscribe((a) => {
          console.log(a);
          this.chat.push(a);
          console.log(this.chat);
        });
    }
    this.text = '';
  }
  GetName(e) {
    if (this.MyID == e) {
      return this.myName;
    }
    return this.userName;
  }
  private subscribeToEvents(): void {
    this.signalr.newMsg.subscribe((data: any) => {
      console.log(data + 'asdasdasd');

      this._Ngzone.run(() => {
        this.serv.getChat(this.id).subscribe((a) => {
          this.chat = a;
          console.log(a + 'asdadsa');

          console.log(this.chat);
        });
      });
    });
  }
}
// gotoChat(e) {
//   this.router.navigate(['/Chat' + '/' + e]);
//   //window.location.assign('/Chat' + '/' + e);

//   this.serv.getChat(e).subscribe((a) => {
//     this.chat = a;
//     console.log(this.chat);
//   });
// }
