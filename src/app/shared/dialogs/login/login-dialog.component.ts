import { Component, Inject, ElementRef, ViewChild, OnInit, 
  AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { take, map, switchMap, exhaustMap, concatMap, tap, 
  takeUntil, mergeMap } from 'rxjs/operators';
import { empty, of, throwError, fromEvent, Subscription, Subject, 
  Observer } from 'rxjs';
import * as _ from 'lodash';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, UserInfo, UserData, UserDataTime } from '../../model/user.model';
import { CrudRestServie } from '../../../shared/services/crud.service';
import { LoginService } from '../../services/login.service';
import * as UTILS from '../../utils/general.utils'

@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('confirmButton' , {static: false, read: ElementRef}) 
  confirmButton: ElementRef;

  @ViewChild('loginButton' , {static: false, read: ElementRef}) 
  loginButton: ElementRef;

  confirmBtnSub: Subscription = new Subscription();
  userConfirmation$: Subject<User> = new Subject();
  userConfirmSub: Subscription = new Subscription();
  userLoginConfirmSub: Subscription = new Subscription();

  currentUser: User;
  defaultGuest: User;
  loginDisable: boolean = true;
  loginRequesting: boolean = false;
  registerMode: boolean;
  title: string;
  subTitle: string;
  btnConfirm: string = "Register";
  btnLogin: string = "Login";
  btnCancel: string;
  warningMsg: string;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public rs: CrudRestServie, 
    public ts: ToastrService,
    public ls: LoginService,
    public cd: ChangeDetectorRef) {

      this.currentUser = data;
      this.loginDisable = this.disableLogin();
      this.registerMode = false;
      this.updateText();

      // create guest user
      this.defaultGuest = new User();
      this.defaultGuest.setUser(new UserInfo());
      
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // can use takeUtil to complete the obs/subjects below.
    // Complete these when dialog window is closed with takeUtil

    this.userConfirmSub = this.userConfirmation$.pipe(
      concatMap((user: User) => {
        if (user) {
          let url: string = "chronometer.json";
          return this.rs.postData<User>(this.currentUser, url);
        } else {
          return empty();
        }
      }),
      takeUntil(this.ls.dialogClose$)
    )
    .subscribe(
      this.getUserCreatedObserver()
    );

    this.confirmBtnSub = fromEvent(this.confirmButton.nativeElement, 'click').pipe(
      tap(
        (res) => {
          this.setWarningMsg(null);
          this.loginRequesting = true;
          this.updateRegisterText();
        }
      ),
      switchMap((res) => {
        let url: string = "chronometer.json";
        return this.rs.getData<any>(url);
      }),
      takeUntil(this.ls.dialogClose$)
    )
    .subscribe(
      (res: HttpResponse<any>) => {
        this.loginRequesting = false;
        this.updateRegisterText();
        this.converCurrentUser();
        let alreadyExist: boolean = false;
        if (res.body) {
          for (let key in res.body) {
            let aUser: User = res.body[key];
            if (aUser.user.id === this.currentUser.user.id) {
              this.ts.info("This user name already exists.", "Error");
              alreadyExist = true;
              this.setWarningMsg("exist");
              break;
            }
          }
          this.userConfirmation$.next(alreadyExist ? null : this.currentUser);
        } else {
          this.ts.error("Server returned NULL." + res.body, "Error");
        }
      },
      (err) => {
      },
      () => {
        console.log("From event done");
      }
    );

    this.userLoginConfirmSub = fromEvent(this.loginButton.nativeElement, 'click').pipe(
      tap(
        (res) => {
          this.setWarningMsg(null);
          this.loginRequesting = true;
          this.updateLoginText();
        }
      ),
      switchMap((res: any) => {
        let url: string = "chronometer.json";
        return this.rs.getData<any>(url);
      }),
      takeUntil(this.ls.dialogClose$)
    )
    .subscribe(
      (res: HttpResponse<any>) => {
        this.loginRequesting = false;
        this.updateLoginText();
        let results: User[] = UTILS.objectToArray(res.body);
        let loggedInUser = _.find(results, {user: {id: this.currentUser.user.id}});
        console.log(loggedInUser)
        if (loggedInUser) {
          this.closeAndSetUser(loggedInUser);
        } else {
          this.setWarningMsg("none");
        }
      },
      (err) => {
      },
      () => {
        console.log("log in event done");
      }
    )
  }

  userIsNew(): void {
    this.setWarningMsg(null);
    this.registerMode = true;
    this.currentUser.user.id = null;
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

  onCancel() {
    if (!this.registerMode) {
      // set guest user as log-in, and close dialog
      this.defaultGuest.setUser(new UserInfo(this.getRandomUserName()));
      this.defaultGuest.isUser = true;
      this.closeAndSetUser(this.defaultGuest);
    } else {
      this.registerMode = false;
      this.updateText();
    }
    this.setWarningMsg(null);
    this.currentUser.user.id = null;
  }

  onLogin() {
    
  }

  updateText() {
    if (this.registerMode) {
      this.btnCancel = "Cancel";
      this.title = "Create account";
      this.subTitle = "This will be your Chronometer account";
    } else {
      this.btnCancel = "Visitor";
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

  getUserCreatedObserver(): Observer<HttpResponse<any>> {
    return {
      next: (res: HttpResponse<any>) => {
        this.ts.success("User created! " + res.body.name, "Welcome");
        this.closeAndSetUser(this.currentUser);
      },
      error: (err: any) => {
        this.ts.error("Server error: " + err, "Error");
      },
      complete: () => {
        console.log("User confirm subject done");
      }
    };
  }
  
  updateRegisterText() {
    this.btnConfirm = this.loginRequesting ? "Registering" : "Register";
  }

  updateLoginText() {
    this.btnLogin = this.loginRequesting ? "Logging in" : "Login";
  }

  closeAndSetUser(user: User) {
    this.ls.dialogClose$.next(true);
    this.dialogRef.close(user);
  }

  setWarningMsg(option: string) {
    switch(option) {
      case "exist": {
        this.warningMsg = "This account name is already taken";
        break;
      }
      case "none": {
        this.warningMsg = "Couldn't find your Chronometer account";
        break;
      }
      default: {
        this.warningMsg = null;
      }
    }
  }

  ngOnDestroy() {
    this.confirmBtnSub.unsubscribe();
    this.userConfirmation$.unsubscribe();
    this.userConfirmSub.unsubscribe();
    this.userLoginConfirmSub.unsubscribe();
  }

}
