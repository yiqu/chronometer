import { Injectable, EventEmitter,  } from '@angular/core';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot,
RouterStateSnapshot, CanDeactivate, Resolve } from '@angular/router';
import { Observable, of, empty } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { User } from '../model/user.model';


@Injectable()
export class LogoutResolver implements Resolve<User> {

constructor(public ls: LoginService) {
}
  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<User> | User {
      let nonUser: User = this.ls.getDefaultUser();
      this.ls.currentUser$.next(nonUser);
      return nonUser;
  }
}