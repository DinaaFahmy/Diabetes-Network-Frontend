import { Component } from '@angular/core';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Diabetes';
  constructor(public acc: AccountService) {}
  logout() {
    this.acc.logout();
  }
  loggedin() {
    this.acc.loggedin();
  }
}
