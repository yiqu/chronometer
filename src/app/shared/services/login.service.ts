import { Injectable } from '@angular/core';
import { LoginDialogData } from '../model/login-dialog.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userData: LoginDialogData;

  constructor() {
    this.userData = new LoginDialogData("Guest");
  }
}