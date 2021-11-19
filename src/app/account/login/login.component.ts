import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../../_models/Login.model';
import noUiSlider from 'nouislider';
import { SignalRService } from 'src/app/_services/signal-r.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  logform: FormGroup;
  logmodel: LoginModel = new LoginModel();
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  isemailexist: boolean = true;
  isemailconfirmed: boolean = true;
  constructor(
    private formbuilder: FormBuilder,
    private serv: AccountService,
    private signalr: SignalRService,
    private token: TokenService
  ) {}

  login() {
    this.assigntoobj();
    this.serv.Login(this.logmodel).subscribe(
      (succes) => {
        var id: string = this.token.getUserId();
        this.signalr.sendID(id);
        alert('login succes');
        window.location.assign('./timeline');
      },
      (err) => {
        console.log(err.status);
        if (err.status == 400) {
          alert(err.error);
        }
      }
    );
  }

  isEmailexist() {
    var email = this.logform.value.Email;
    if (email != null && email !== '' && this.logform.get('Email').touched) {
      this.serv.EmailExist(email).subscribe((a) => {
        this.isemailexist = a;
        console.log(a);
      });
      this.serv.Emailconfirmed(email).subscribe((a) => {
        this.isemailconfirmed = a;
        console.log(a);
      });
    }
  }

  assigntoobj() {
    this.logmodel.Email = this.logform.value.Email;
    this.logmodel.Password = this.logform.value.Password;
    this.logmodel.RememberMe = this.logform.value.RememberMe;
  }
  ngOnInit(): void {
    this.logform = this.formbuilder.group({
      Email: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      RememberMe: [false],
    });
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
  }
}
