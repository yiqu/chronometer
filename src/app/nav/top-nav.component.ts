import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NavItem } from '../shared/model/nav-item.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginDialogComponent } from '../shared/dialogs/login/login-dialog.component';
import { LoginService } from '../shared/services/login.service';
import { User } from '../shared/model/user.model';
import { RouterDataConfig } from '../shared/model/nav-item.model';


const NAV_ITEM_LIST = [
  new NavItem("Home", "home"),
  new NavItem("About", "about"),
]
const loginQueryParamKey: string = "loginDialog";

@Component({
  selector: 'app-navbar',
  templateUrl: 'top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class NavBarComponent implements OnInit {

  public navItemsList: NavItem[] = [];
  public menuOpen: boolean = false;
  currentUser: User;
  userLoginText: string;
  routerData: RouterDataConfig = new RouterDataConfig(null, null, null);

  constructor(public router: Router, public route: ActivatedRoute,
    public dialog: MatDialog, public ls: LoginService) {
      this.navItemsList.push(...NAV_ITEM_LIST);
      this.route.queryParamMap.subscribe((params: ParamMap) => {
        if (params.get(loginQueryParamKey)) {
          this.openDialog();
        }
      });
  }

  ngOnInit() {
    this.ls.currentUser$.subscribe((user: User) => {
      console.log("USER top nav:", user)
      this.currentUser = new User(user.user, user.admin, user.isUser, 
        user.data, user.hashKey);
      this.updateLoginCompoent(this.currentUser.isUser);
    });
  }

  updateLoginCompoent(isUser: boolean) {
    if (isUser) {
      this.userLoginText = "Logout";
      this.routerData.links = ['/logout'];
      this.routerData.params = {user: this.currentUser.user.id};
      this.routerData.handling = "";
    } else {
      this.userLoginText = "Login";
      this.routerData.links = ['/home'];
      this.routerData.params = {loginDialog: true};
      this.routerData.handling = "merge";
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '350px',
      autoFocus: true,
      disableClose: true,
      panelClass: 'login-overlay',
      backdropClass: 'login-overlay-background',
      data: this.currentUser
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ls.userLogin(result);
    });
  }

}
