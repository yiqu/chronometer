import { Injectable } from '@angular/core';
import { User, UserInfo} from '../model/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userData: User;

  constructor(public router: Router, public route: ActivatedRoute) {
    // create init user
    this.userData = new User();
    this.userData.setUser(new UserInfo());
  }

  userLogin(data: User) {
    this.userData = data;
    this.router.navigate(['/home'], {
      queryParams: {user: this.userData.user.id},
      queryParamsHandling: ''
    });
  }
}