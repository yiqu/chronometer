import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { HistoryComponent } from '../history/history.component';
import { NotFoundComponent } from '../404/404.component';
import { MaterialModule } from '../shared/material-barrel.module';
import { PipesBarrelModule } from '../shared/pipes/pipes-barrel.module';
import { SnackBarBarrelModule } from '../shared/snack-bars/snack-bars.module';
import { LoginDialogComponent } from '../shared/dialogs/login/login-dialog.component';
import { DirectivesBarrelModule } from '../shared/directives/dir-barrel.module';
import { SharedTableModule } from '../shared/table/table.module';
import { LogoutComponent } from '../logout/logout.component';
import { LoadingModule } from '../loading/loading.module'

@NgModule({
  declarations: [
    CoreComponent,
    HistoryComponent,
    NotFoundComponent,
    LogoutComponent
  ],

  imports: [
    CommonModule , 
    FormsModule, 
    MaterialModule,
    PipesBarrelModule,
    SnackBarBarrelModule,
    DirectivesBarrelModule,
    SharedTableModule,
    LoadingModule
  ],

  exports: [
  ],
  
  providers: [
  ],

  entryComponents: [
    LoginDialogComponent
  ]

})
export class CoreModule { }
