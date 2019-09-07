import {Component, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, UserInfo} from '../../model/user.model';
import { CrudRestServie } from '../../../shared/services/crud.service';
import { HttpResponse } from '@angular/common/http';
import { take, map, switchMap, exhaustMap } from 'rxjs/operators';
import { empty, of, throwError } from 'rxjs';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {

  currentUser: User;
  defaultGuest: User;
  loginDisable: boolean = true;
  registerMode: boolean;
  title: string;
  subTitle: string;
  btnConfirm: string;
  btnCancel: string;


  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public rs: CrudRestServie, public ts: ToastrService) {

      this.currentUser = data;
      this.loginDisable = this.disableLogin();
      this.registerMode = false;
      this.updateText();

      // create guest user
      this.defaultGuest = new User();
      this.defaultGuest.setUser(new UserInfo());
  }

  userIsNew(): void {
    this.registerMode = true;
    this.updateText();
  }

  onLoginNameChange(data) {
    this.loginDisable = this.disableLogin();
  }

  disableLogin() {
    if (this.currentUser && 
      this.currentUser.user && 
      this.currentUser.user.id &&
      this.currentUser.user.id.trim() !== "") {
      return false;
    }
    return true;
  }

  onConfirm() {
    let url: string = "chronometer.json";
    this.rs.getData(url)
    .pipe(
      switchMap((res: HttpResponse<any>) => {
        let arr: User[] = [];
        if (res.body) {
          for (let key in res.body) {
            let aUser: User = res.body[key];
            if (aUser.user.id === this.currentUser.user.id) {
              this.ts.info("This user name already exists.", "Error");
              return empty();
            }
          }
          this.converCurrentUser();
          return this.rs.postData(this.currentUser, url);
        }
        return throwError('Data of NULL was returned');
      })
    )
    .subscribe({
      next: (res: any) => {
        this.ts.success("Creation was a great success! " + res.body.name, "Welcome");
      },
      error: (err) => {
        this.ts.error("Server error: " + err, "Error");
      },
      complete: () => {
        // close dialog
      }
    });
  }

  onCancel() {
    if (!this.registerMode) {
      // set guest user as log-in, and close dialog
      this.defaultGuest.setUser(new UserInfo(this.getRandomUserName()));
      this.defaultGuest.isUser = true;
      this.dialogRef.close(this.defaultGuest);
    } else {
      this.registerMode = false;
      this.updateText();
    }
  }

  onLogin() {
    // this.userData.name = this.userData.name.trim();
    // this.userData.isUser = true;
    // this.dialogRef.close(this.userData);
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

  converCurrentUser() {
    this.currentUser.admin = false;
    this.currentUser.isUser = true;
    this.currentUser.setNoName();
  }

}