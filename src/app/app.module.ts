import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { TopNavModule } from './nav/top-nav.module';
import { ResetLapSnackBarComponent } from './shared/snack-bars/reset-lap.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    TopNavModule,
    AppRoutingModule
  ],

  providers: [],

  entryComponents: [
    ResetLapSnackBarComponent
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
