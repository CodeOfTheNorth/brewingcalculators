import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { WelcomeDialog } from './dialogs/welcome-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedOption: string;
  openDialog() {
    setTimeout(() => {
      localStorage['newUser'] = 'hi friend!';
      this.dialog.open(WelcomeDialog);
    }, 2000);
  }
  constructor(public dialog: MdDialog){

  }
  ngOnInit() {
    if(localStorage['newUser']!='hi friend!'){this.openDialog();}
  }
}
