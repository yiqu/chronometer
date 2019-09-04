import {Component, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../model/login-dialog.model';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {

  userData: User;
  defaultGuest: User = new User(null, false, false);
  loginDisable: boolean = true;
  registerMode: boolean;
  title: string;
  subTitle: string;
  btnConfirm: string;
  btnCancel: string;


  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) {
      this.userData = data;
      this.loginDisable = this.disableLogin();
      this.registerMode = false;
      this.updateText();
  }

  userIsNew(): void {
    this.registerMode = true;
    this.updateText();
  }

  onLoginNameChange(data) {
    this.loginDisable = this.disableLogin();
  }

  disableLogin() {
    if (this.userData) {
      if (this.userData.name && this.userData.name.trim() !== "") {
        return false;
      }
    }
    return true;
  }

  onConfirm() {

  }

  onCancel() {
    if (!this.registerMode) {
      this.defaultGuest.name = this.getRandomUserName();
      this.defaultGuest.isUser = true;
      this.dialogRef.close(this.defaultGuest);
    } else {
      this.registerMode = false;
      this.updateText();
    }
  }

  onLogin() {
    this.userData.name = this.userData.name.trim();
    this.userData.isUser = true;
    this.dialogRef.close(this.userData);
  }

  updateText() {
    if (this.registerMode) {
      this.btnCancel = "Cancel";
      this.btnConfirm = "Register";
      this.title = "Create account";
      this.subTitle = "This will be your Chronometer account";
    } else {
      this.btnCancel = "Visitor";
      this.btnConfirm = "Login";
      this.title = "Sign in";
      this.subTitle = "Use your Chronometer account"
    }

  }

  getRandomUserName() {
    return (Math.random() + "").slice(5);
  }

}