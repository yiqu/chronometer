import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginDialogComponent } from './login/login-dialog.component';
import { MaterialModule } from '../material-barrel.module';

@NgModule({
  imports: [
    FormsModule,
    MaterialModule
  ],
  exports: [
    LoginDialogComponent
  ],
  declarations: [
    LoginDialogComponent
  ],
  providers: [],
})
export class DialogBarrelModule { }
