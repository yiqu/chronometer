import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { TopNavModule } from './nav/top-nav.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  
  imports: [
    BrowserModule,
    CoreModule,
    TopNavModule,
    AppRoutingModule
  ],

  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
