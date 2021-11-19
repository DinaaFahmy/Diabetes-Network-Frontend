import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../_services/token.service';
//import { tokenName } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private token: TokenService, private router: Router) {}
  canActivate(): boolean {
    if (this.token.isvalid()) return true;
    else {
      console.log('notAllowed');

      this.token.handleAuthError();
    }
  }
}
