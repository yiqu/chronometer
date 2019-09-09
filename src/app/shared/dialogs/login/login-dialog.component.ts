import { Component, Inject, ElementRef, ViewChild, OnInit, 
  AfterViewInit, OnDestroy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { take, map, switchMap, exhaustMap, concatMap, tap } from 'rxjs/operators';
import { empty, of, throwError, fromEvent, Subscription, Subject, Observer } from 'rxjs';
import * as _ from 'lodash';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, UserInfo} from '../../model/user.model';
import { CrudRestServie } from '../../../shared/services/crud.service';


@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('confirmButton' , {static: false, read: ElementRef}) 
  confirmButton: ElementRef;
  confirmBtnSub: Subscription = new Subscription();
  userConfirmation$: Subject<User> = new Subject();

  currentUser: User;
  defaultGuest: User;
  loginDisable: boolean = true;
  loginRequesting: boolean = false;
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

  ngOnInit() {
  }

  ngAfterViewInit() {
    // can use takeUtil to complete the obs/subjects below.
    // Complete these when dialog window is closed with takeUtil

    this.userConfirmation$
      .pipe(
        concatMap((user: User) => {
          if (user) {
            let url: string = "chronometer.json";
            return this.rs.postData(this.currentUser, url);
          } else {
            // set helper text to let user know pick new name
            return empty();
          }
          
        })
      )
      .subscribe(
        this.getUserCreatedObserver()
      );

    this.confirmBtnSub = fromEvent(this.confirmButton.nativeElement, 'click')
      .pipe(
        tap(
          (res) => {
            this.loginRequesting = true;
            this.updateRegisterText();
          }
        ),
        switchMap((res) => {
          let url: string = "chronometer.json";
          return this.rs.getData(url);
        })
      )
      .subscribe(
        (res: HttpResponse<any>) => {
          this.converCurrentUser();
          let alreadyExist: boolean = false;
          if (res.body) {
            for (let key in res.body) {
              let aUser: User = res.body[key];
              if (aUser.user.id === this.currentUser.user.id) {
                this.ts.info("This user name already exists.", "Error");
                alreadyExist = true;
                break;
              }
            }
            this.loginRequesting = false;
            this.updateRegisterText();
            this.userConfirmation$.next(alreadyExist ? null : this.currentUser);
          } else {
            this.ts.error("Server returned NULL." + res.body, "Error");
          }
        },
        (err) => {
        },
        () => {
          // fromEvent will not complete by itself!
        }
      );
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

  getUserCreatedObserver(): Observer<HttpResponse<any>> {
    return {
      next: (res: HttpResponse<any>) => {
        this.ts.success("User created! " + res.body.name, "Welcome");
        this.dialogRef.close(this.currentUser);
      },
      error: (err: any) => {
        this.ts.error("Server error: " + err, "Error");
      },
      complete: () => {
        // subject will not complete by itself!
      }
    };
  }
  
  updateRegisterText() {
    this.btnConfirm = this.loginRequesting ? "Registering" : "Register";
  }

  ngOnDestroy() {
    this.confirmBtnSub.unsubscribe();
    this.userConfirmation$.unsubscribe();
  }

}
