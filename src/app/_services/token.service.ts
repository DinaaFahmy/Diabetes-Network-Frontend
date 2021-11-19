import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  jwtHelper = new JwtHelperService();
  decodedtoken: any;
  constructor(private router: Router) {}

  gettoken() {
    let Token = sessionStorage.getItem('TokenInfo');
    console.log(Token);

    if (Token != null) {
      this.decodedtoken = this.jwtHelper.decodeToken(Token);
      return this.decodedtoken;
    }
    //this.handleAuthError();
  }
  getUserName() {
    let Token = sessionStorage.getItem('TokenInfo');
    if (Token != null) {
      this.decodedtoken = this.jwtHelper.decodeToken(Token);
      return this.decodedtoken.given_name;
    }
  }
  getUserId() {
    let Token = sessionStorage.getItem('TokenInfo');
    if (Token != null) {
      this.decodedtoken = this.jwtHelper.decodeToken(Token);
      return this.decodedtoken.family_name;
    }
  }
  isvalid() {
    let Token = sessionStorage.getItem('TokenInfo');
    if (Token != null) {
      return !this.jwtHelper.isTokenExpired(Token);
    }
  }
  public handleAuthError() {
    sessionStorage.removeItem('TokenInfo');
    this.router.navigateByUrl('login');
  }

  getRole() {
    let Token = sessionStorage.getItem('TokenInfo');
    if (Token != null) {
      this.decodedtoken = this.jwtHelper.decodeToken(Token);
      return this.decodedtoken.role;
    }
  }
  isPatient(): boolean {
    let Token = sessionStorage.getItem('TokenInfo');
    if (Token != null) {
      this.decodedtoken = this.jwtHelper.decodeToken(Token);
      return this.decodedtoken.role == 'Patient';
    }
  }
  isDoctor(): boolean {
    let Token = sessionStorage.getItem('TokenInfo');
    if (Token != null) {
      this.decodedtoken = this.jwtHelper.decodeToken(Token);
      return this.decodedtoken.role == 'Doctor';
    }
  }
}
