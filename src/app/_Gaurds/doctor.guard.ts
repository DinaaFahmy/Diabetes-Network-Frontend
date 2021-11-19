import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../_services/token.service';

@Injectable({
  providedIn: 'root',
})
export class DoctorGuard implements CanActivate {
  constructor(private token: TokenService, private router: Router) {}
  canActivate(): boolean {
    if (this.token.isDoctor()) return true;
    else {
      this.router.navigateByUrl('Home');
    }
  }
}
