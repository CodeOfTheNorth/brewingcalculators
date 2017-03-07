import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  snackMessage: string;
  snackAction: string = 'OK';
  help: boolean = true;
  stepName:string = 'Boil';
  entryMessage:string = 'Enter a major timer duration';
  majorStep:boolean = true;
  timer = {
    'timerValues': {
      'majorSteps': []
    }
  };
  // timerDuration:number;
  // timeRemaining:string;
  // alarmTime:string;
  // timeEnd: number;
  // timerInstance: any;
  inputHours: string;
  inputMinutes: string;
  // timerRunning: boolean;
  re = /[0-9.]/;
  constructor(public snackBar: MdSnackBar) { }
  openSnack() {
    let config = new MdSnackBarConfig();
    config.duration = 6000;
    this.snackBar.open(this.snackMessage, this.snackAction, config);
  }
  validateHoursInput(){
    if (!this.inputHours){return}
    var newHours:string = '';
    for (var i = 0, len = this.inputHours.length; i < len; i++){
      if (this.inputHours[i].match(this.re)){
        newHours += this.inputHours[i];
      }
    }
    this.inputHours = newHours;
  }
  validateMinutesInput(){
    if (!this.inputMinutes){return}
    var newMinutes:string = '';
    for (var i = 0, len = this.inputMinutes.length; i < len; i++){
      if (this.inputMinutes[i].match(this.re)){
        newMinutes += this.inputMinutes[i];
      }
    }
    this.inputMinutes = newMinutes;
  }
  addTimer(){
    if (!this.inputHours && !this.inputMinutes) {// handles null input
      return;
    }
    if (this.majorStep){
      this.addMajor();
    } else {
      this.addMinor();
    }
  }
  printHHMM(ms:number){
    var time = ms/60000;
    var minutes = time % 60;
    var hours = Math.abs(Math.round(time/60));
    var min = '';
    var hr = '';
    if (minutes.toString().length == 1){ min = '0'+ minutes} else { min = minutes.toString()}
    if (hours.toString().length == 1){ hr = '0'+ hours} else { hr = hours.toString()}
    var timeString:string = hr + ':' + min;
    return timeString;
  }

  addMajor(){
    if(!this.stepName){
      this.stepName = 'timer'+ Math.random().toFixed(8);
      this.snackMessage = 'No timer name found! Setting name to: ' + this.stepName + ' You can edit this later.';
      this.openSnack();
    }
    var time;
    var name = this.stepName
    var hours = 0;
    if(this.inputHours){hours = parseFloat(this.inputHours);}
    var minutes = 0;
    if(this.inputMinutes){minutes = parseFloat(this.inputMinutes);}
    time = (hours * 60 + minutes) * 60000;

    this.timer['timerValues']['majorSteps']
      .push({
        'name':this.stepName,
        'totalTime':time,
        'minorSteps':[]
      })
    localStorage['timer'] = JSON.stringify(this.timer);
  }
  addMinor(){
    if(!this.stepName){
      this.stepName = 'step'+ Math.random().toFixed(8);
      this.snackMessage = 'No step name found! Setting name to: ' + this.stepName + ' You can edit this later.';
      this.openSnack();
    }
  }


  // timer:
  // timerValues:
  // [
  //   majorStep1Name:
  //     [
  //       totalTime: 60,
  //       isRunning: false
  //       minorSteps:
  //         [
  //           step1Name: time
  //         ]
  //     ]
  // ]






  // setTimer(){
  //   if (!this.inputHours && !this.inputMinutes) {// handles null input
  //     return;
  //   }
  //   clearInterval(this.timerInstance);
  //   this.alarmTime = '';
  //   this.timeRemaining = '00:00';
  //   var hours = 0
  //   if(this.inputHours){hours = parseFloat(this.inputHours);}
  //   var minutes = 0
  //   if(this.inputMinutes){minutes = parseFloat(this.inputMinutes);}
  //   this.timerDuration = (hours * 60 + minutes) * 60000;
  //   // convert the total amount into milliseconds
  //   console.log(this.timerDuration);
  // }
  // startTimer(){
  //   this.timeEnd = this.timerDuration + Date.now();
  //   localStorage['brewtimer'] = this.timeEnd.toString();
  //   // set the end time as a variable and store in the database.
  //   this.alarmTime = new Date(this.timeEnd).toTimeString();
  //   // display the time the alarm will go off.
  //   this.timerInstance = setInterval(() =>{this.runTimer()},1000);
  //   // do the thing
  // }
  // stopTimer(){
  //   if(this.timerRunning){
  //     this.timerRunning = !this.timerRunning;
  //     clearInterval(this.timerInstance);
  //   }
  // }
  // runTimer(){
  //   if (this.timeEnd){
  //     if(!this.timerRunning){this.timerRunning = !this.timerRunning}
  //     this.timeRemaining = '';
  //     var remaining = this.timeEnd - Date.now();
  //     // remaining time is equal to the end time minus the current time
  //     if (remaining <=0){clearInterval(this.timerInstance); this.timerRunning = !this.timerRunning;};
  //     // stop if we're done.
  //     if (remaining >= 3600000){
  //       var hours = Math.floor(remaining / 3600000);
  //       remaining = remaining % 3600000;
  //       this.timeRemaining = hours + ':';
  //     }
  //     var minutes = Math.floor(remaining / 60000);
  //     if (minutes.toString().length == 1){
  //       this.timeRemaining += '0';
  //     }
  //     this.timeRemaining += minutes + ':';
  //     remaining = remaining % 60000;
  //     var seconds = Math.floor(remaining / 1000);
  //     if (seconds.toString().length == 1){
  //       this.timeRemaining += '0';
  //     }
  //     this.timeRemaining += seconds;
  //   } else {
  //     this.timerRunning = false;
  //     clearInterval(this.timerInstance);
  //   }
  // }


  ngOnInit() {
    // if(localStorage['brewtimer']){
    //   this.timeEnd = Number(localStorage['brewtimer']);
    //   // retrieve timer info from storage.
    //   if(Date.now()>=this.timeEnd){
    //     localStorage['brewtimer'] = '';
    //     return
    //   }
    //   this.alarmTime = new Date(this.timeEnd).toTimeString();
    //   // display the time the alarm will go off.
    //   this.timerInstance = setInterval(() =>{this.runTimer()},1000);
    //   // do the thing
    // } else {
    //   localStorage['brewtimer'] = '';
    // }
  }
}
