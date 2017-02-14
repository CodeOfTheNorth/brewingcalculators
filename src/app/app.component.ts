import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedOption: string;
  openDialog() {
    setTimeout(() => {
      this.dialog.open(WelcomeDialog);
    }, 2000);
    // let dialogRef = this.dialog.open(WelcomeDialog);
    // dialogRef.afterClosed().subscribe(result => {
    //   this.selectedOption = result;
    // });
  }
  constructor(public dialog: MdDialog){

  }
  ngOnInit() {
    this.openDialog();
  }
}

@Component({
  selector: 'welcome-dialog',
  template: '<md-dialog-content color="primary"><h1>Hi!</h1></md-dialog-content>'
  // templateUrl: './welcome-dialog.component.html'
})
export class WelcomeDialog{}
