import {Component, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../model/login-dialog.model';

@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {

  defaultGuest: User = new User("guest", false, false);
  loginDisable: boolean = true;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) {
      this.loginDisable = this.disableLogin();
    }

  onDefaultClick(): void {
    this.dialogRef.close();
  }

  onLoginNameChange(data) {
    this.loginDisable = this.disableLogin();
  }

  disableLogin() {
    if (this.data) {
      if (this.data.name && this.data.name.trim() !== "") {
        return false;
      }
    }
    return true;
  }

  onLogin() {
    this.data.name = this.data.name.trim();
    this.data.isUser = true;
    this.dialogRef.close(this.data);
  }

}