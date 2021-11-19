import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../_services/token.service';

@Injectable({
  providedIn: 'root',
})
export class PatientGuard implements CanActivate {
  constructor(private token: TokenService, private router: Router) {}
  canActivate(): boolean {
    if (this.token.isPatient()) {
      console.log(this.token.isPatient);

      return true;
    } else {
      console.log('noPass');

      this.router.navigateByUrl('Home');
    }
  }
}
