import { Injectable } from '@angular/core';
import { User, UserInfo} from '../model/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // current user data
  userData: User;

  // sub to emit when login dialog window closes
  dialogClose$: Subject<boolean> = new Subject();

  constructor(public router: Router, public route: ActivatedRoute) {
    // create init user
    this.userData = new User();
    this.userData.setUser(new UserInfo());
  }

  /**
   * User register/login callback.
   * @param data 
   */
  userLogin(data: User) {
    this.userData = data;
    this.router.navigate(['/home'], {
      queryParams: {user: this.userData.user.id},
      queryParamsHandling: ''
    });
  }
}