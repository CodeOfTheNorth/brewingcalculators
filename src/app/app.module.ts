import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { CalcsService } from './calcs.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeDialog } from './dialogs/welcome-dialog.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { PostMissingComponent } from './post-missing/post-missing.component';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeDialog,
    NavbarComponent,
    CalculatorComponent,
    PostMissingComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [CalcsService],
  entryComponents: [WelcomeDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
