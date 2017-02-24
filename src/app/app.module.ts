import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule, MdIconRegistry } from '@angular/material';
import 'hammerjs';
import { CalcsService } from './calcs.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeDialog } from './dialogs/welcome-dialog.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { PostMissingComponent } from './post-missing/post-missing.component';
import { HelpComponent } from './help/help.component';
import { TimerComponent } from './timer/timer.component';


import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeDialog,
    NavbarComponent,
    CalculatorComponent,
    PostMissingComponent,
    HelpComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routes
  ],
  providers: [CalcsService],
  entryComponents: [WelcomeDialog],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'keyboard-arrow-left',
        sanitizer.bypassSecurityTrustResourceUrl('../assets/img/svg/ic_keyboard_arrow_left_black_24px.svg'));
  }
}
