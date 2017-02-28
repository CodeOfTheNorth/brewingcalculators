import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timerDuration:number;
  timeRemaining:string;
  alarmTime:string;
  timeEnd: number;
  timerInstance: any;
  inputHours: string;
  inputMinutes: string;
  re = /[0-9.]/;
  constructor() { }

  setTimer(){
    if (!this.inputHours && !this.inputMinutes) {// handles null input
      return;
    }
    clearInterval(this.timerInstance);
    var hours = 0
    if(this.inputHours){hours = parseFloat(this.inputHours);}
    var minutes = 0
    if(this.inputMinutes){minutes = parseFloat(this.inputMinutes);}
    this.timerDuration = (hours * 60 + minutes) * 60000;
    // convert the total amount into milliseconds
    this.startTimer();
  }
  startTimer(){
    this.timeEnd = this.timerDuration + Date.now();
    localStorage['brewtimer'] = this.timeEnd.toString();
    // set the end time as a variable and store in the database.
    this.alarmTime = new Date(this.timeEnd).toTimeString();
    // display the time the alarm will go off.
    this.timerInstance = setInterval(() =>{this.runTimer()},1000);
    // do the thing
  }
  runTimer(){
    if (this.timeEnd){
      this.timeRemaining = '';
      var remaining = this.timeEnd - Date.now();
      // remaining time is equal to the end time minus the current time
      if (remaining <=0){clearInterval(this.timerInstance)};
      // stop if we're done.
      if (remaining >= 3600000){
        var hours = Math.floor(remaining / 3600000);
        remaining = remaining % 3600000;
        this.timeRemaining = hours + ':';
      }
      var minutes = Math.floor(remaining / 60000);
      if (minutes.toString().length == 1){
        this.timeRemaining += '0';
      }
      this.timeRemaining += minutes + ':';
      remaining = remaining % 60000;
      var seconds = Math.floor(remaining / 1000);
      if (seconds.toString().length == 1){
        this.timeRemaining += '0';
      }
      this.timeRemaining += seconds;
    }
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

  ngOnInit() {
    if(localStorage['brewtimer']){
      this.timeEnd = Number(localStorage['brewtimer']);
      // retrieve timer info from storage.
      this.alarmTime = new Date(this.timeEnd).toTimeString();
      // display the time the alarm will go off.
      this.timerInstance = setInterval(() =>{this.runTimer()},1000);
      // do the thing
    } else {
      localStorage['brewtimer'] = '';
    }
  }
}
