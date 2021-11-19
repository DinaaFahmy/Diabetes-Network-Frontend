import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { TokenService } from '../_services/token.service';
import { AccountService } from '../_services/account.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { TestDialogComponent } from '../patient/test-dialog/test-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SignalRService } from '../_services/signal-r.service';
import { ToastrService, Toast } from 'ngx-toastr';
import { ChatService } from '../_services/chat.service';
import { Router } from '@angular/router';

//import noUiSlider from 'nouislider';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  doctor: boolean = false;
  patientt: boolean = false;
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  role: string;
  patient: boolean = false;
  chats: any;
  faBars = faBars;
  notificationColor: string;
  constructor(
    private toastr: ToastrService,

    private token: TokenService,
    public acc: AccountService,
    private dialog: MatDialog,
    private _Ngzone: NgZone,
    private signalr: SignalRService,
    private chat: ChatService,
    public router: Router
  ) {
    this.patientt = this.token.isPatient();
    this.doctor = this.token.isDoctor();
  }
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  ngOnInit() {
    this.notificationColor = 'background: lightgray;';
    //this.role = this.token.gettoken().role;
    this.patient = this.token.isPatient();
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');
    this.subscribeToEvents();
    var slider = document.getElementById('sliderRegular');

    // noUiSlider.create(slider, {
    //   start: 40,
    //   connect: false,
    //   range: {
    //     min: 0,
    //     max: 100,
    //   },
    // });

    var slider2 = document.getElementById('sliderDouble');

    var a = this.chat.getChats();
    if (a != undefined) a.subscribe((a) => (this.chats = a));
    //   noUiSlider.create(slider2, {
    //     start: [20, 60],
    //     connect: true,
    //     range: {
    //       min: 0,
    //       max: 100,
    //     },
    //   });
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }
  logout() {
    this.acc.logout();
  }
  loggedin() {
    this.acc.loggedin();
  }
  addtest() {
    const dialogRef = this.dialog.open(TestDialogComponent, {
      panelClass: ['col-12', 'col-md-4', 'col-sm-12'],
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result != undefined) {
        this.ngOnInit();
        // console.log(this.checkup);
      }
    });
  }
  private subscribeToEvents(): void {
    this.signalr.newMsg.subscribe((data: any) => {
      this._Ngzone.run(() => {
        this.toastr.success(data);
        this.notificationColor = 'background: red;';

        this.chat.getChats().subscribe((a) => (this.chats = a));
        console.log(data);
      });
    });
  }
  isActive(i: any) {
    if (this.router.isActive(i, true)) return 'background-color:#a1d0ea';
  }
  setcolor() {
    this.notificationColor = 'background: lightgray;';
  }
}
