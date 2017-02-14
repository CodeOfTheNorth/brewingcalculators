import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeDialog } from './dialogs/welcome-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeDialog,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  entryComponents: [WelcomeDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
