import {Component, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginDialogData } from '../../model/login-dialog.model';

@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {

  defaultGuest: LoginDialogData = new LoginDialogData("Guest");

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginDialogData) {
    }

  onDefaultClick(): void {
    this.dialogRef.close();
  }

}