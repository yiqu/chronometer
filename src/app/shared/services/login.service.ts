import { Injectable } from '@angular/core';
import { User } from '../model/login-dialog.model';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userData: User;
  userName: string = "";

  constructor(public router: Router, public route: ActivatedRoute) {
    this.userData = new User(null);
  }

  userLogin(data: User) {
    this.userData = data;
    console.log(this.userData)
    this.router.navigate(['/home'], {
      queryParams: {user: this.userData.name},
      queryParamsHandling: ''
    });
  }
}