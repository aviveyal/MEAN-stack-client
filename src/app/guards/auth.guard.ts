import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { AuthService } from '../services/auth.service';
import {User} from "../models/User";

@Injectable()
export class AuthGuard implements CanActivate {
  user : User;

  constructor (private authService:AuthService, private router:Router){
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    });
  }

  canActivate() {
    if(this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }


  }

}
