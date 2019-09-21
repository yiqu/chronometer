import { Injectable } from '@angular/core';
import { User, UserInfo, UserData } from '../model/user.model';
import { TimeData } from '../model/data.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // current user data
  userData: User;
  // sub to emit when login dialog window closes
  dialogClose$: Subject<boolean> = new Subject();
  currentUser$: BehaviorSubject<User>;

  constructor(public router: Router, public route: ActivatedRoute) {
    // create init user
    this.userData = new User();
    this.userData.setUser(new UserInfo());
    this.currentUser$ = new BehaviorSubject(this.userData);
  }

  /**
   * User register/login callback.
   * @param data 
   */
  userLogin(data: User) {
    this.setUserData(data);

    this.router.navigate(['/home'], {
      queryParams: {user: this.userData.user.id},
      queryParamsHandling: ''
    });
  }

  setUserData(data: User) {
    let userTimeData: UserData = new UserData();
    let timeDatas: TimeData[] = [];
    _.forOwn(data.data.time, (val: TimeData, key: string) => {
      let timeData: TimeData = new TimeData(val.duration, val.createDate, val.endDate, key, val.info);
      timeDatas.push(timeData);
    })
    userTimeData.setTime(timeDatas);
    this.userData = new User(data.user, data.admin, data.isUser, userTimeData, data.hashKey);
    // emit logged-in user
    this.currentUser$.next(this.userData);

  }

  getDefaultUser(): User {
    let user = new User();
    user.setUser(new UserInfo());
    return user;
  }
}