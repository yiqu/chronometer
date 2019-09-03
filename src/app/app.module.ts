import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { TopNavModule } from './nav/top-nav.module';
import { ResetLapSnackBarComponent } from './shared/snack-bars/reset-lap.component';
import { DialogBarrelModule } from './shared/dialogs/dialog-barrel.module';
import { LoginDialogComponent } from './shared/dialogs/login/login-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent
  ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    TopNavModule,
    DialogBarrelModule,
    AppRoutingModule
  ],

  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {name: 'guest'} },
  ],

  entryComponents: [
    ResetLapSnackBarComponent,
    LoginDialogComponent
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
