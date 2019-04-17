import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthserviceService } from './authservice.service'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthserviceService, private router: Router) { }
  canActivate(): boolean {
    if (this.auth.isUser()) {
      return true;
    }
    else {
      this.router.navigate([''])
      return false;
    }
  }
}

