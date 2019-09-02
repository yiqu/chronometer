import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NavItem } from '../shared/model/nav-item.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginDialogComponent } from '../shared/dialogs/login/login-dialog.component';
import { LoginDialogData } from '../shared/model/login-dialog.model';
import { LoginService } from '../shared/services/login.service';


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

  constructor(public router: Router, public route: ActivatedRoute,
    public dialog: MatDialog, public ls: LoginService) {

    this.navItemsList.push(...NAV_ITEM_LIST);

    this.route.queryParamMap.subscribe((params: ParamMap) => {
      if (params.get(loginQueryParamKey)) {
        this.openDialog();
      }
    })
  }

  ngOnInit() {
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '250px',
      autoFocus: true,
      disableClose: true,
      panelClass: 'login-overlay',
      backdropClass: 'login-overlay-background',
      data: this.ls.userData
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      this.ls.userData = result;
    });
  }

}
