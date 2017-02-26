import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timerInput:string;
  brewtimer:any;
  timeRemaining:string;
  alarmTime:string;
  // timeLocaleEnd:string;
  timeEnd: number;
  timerInstance: any;
  constructor() { }

  setTimer(){
    if (this.timerInput){
      if(this.timerInput.match(/\d{2}:\d{2}$/))
      // make sure the timer input matches our validation
      {
        clearInterval(this.timerInstance);
        this.timeRemaining = this.timerInput;
        // bind it to the display
        var hours = parseInt(this.timerInput.substring(0,2));
        var minutes = parseInt(this.timerInput.substring(3,5));
        // pull the hours and minutes from the plain text string
        var milliseconds = (hours * 60 + minutes) * 60000;
        // convert the total amount into milliseconds

        console.log(Date.now());
        // now in milliseconds
        console.log(Date.now() + milliseconds);
        // timer end time in milliseconds

        this.timeEnd = milliseconds + Date.now();
        localStorage['brewtimer'] = this.timeEnd.toString();
        this.alarmTime = new Date(this.timeEnd).toTimeString();

        // this.timeEnd = new Date(milliseconds + Date.now());
        // bind timeEnd to the date object of the ending time

        // this.timeLocaleEnd = new Date(milliseconds + Date.now()).toLocaleTimeString();
        // bind timeLocaleEnd to a string of the local time when the calculator ends

        // Date.UTC(year, month, day, hours, minutes, seconds, millisec)
        // console.log(new Date(Date.UTC(0,0,0,hours,minutes)));
        // console.log(new Date(milliseconds));

        // console.log(new Date(milliseconds).toTimeString());
        // console.log(typeof new Date(milliseconds).toTimeString());
        // console.log(this.timeLocaleEnd);
        // console.log(this.timeLocaleEnd);
        // console.log(this.timeEnd);
        // unfinished stuff
        // console.log(Date.parse(this.timeLocaleEnd));
        this.timerInstance = setInterval(() =>{this.runTimer()},1000);
        // do the thing
      }
    }
  }
  runTimer(){
    if (this.timeEnd){
      this.timeRemaining = '';
      var remaining = this.timeEnd - Date.now();
      if (remaining <=0){clearInterval};
      if (remaining >= 3600000){
        var hours = Math.floor(remaining / 3600000);
        var remaining = remaining % 3600000;
        this.timeRemaining = hours + ':';
      }
      var minutes = Math.floor(remaining / 60000);
      if (minutes.toString().length == 1){
        this.timeRemaining += '0';
      }
      this.timeRemaining += minutes + ':';
      var remaining = remaining % 60000;
      var seconds = Math.floor(remaining / 1000);
      if (seconds.toString().length == 1){
        this.timeRemaining += '0';
      }
      this.timeRemaining += seconds;
    }
  }
  validateTimerInput(){
    if (this.timerInput.length >= 5 && !this.timerInput.match(/\d{2}:\d{2}$/)){
      // erase button-smashing results
      this.timerInput = '';
      return;
    } else if (this.timerInput.length == 0)
    // keyup event could be a backspace leaving us with an empty string.
    {
      return;
    } else if (this.timerInput.substring(this.timerInput.length - 1) == ':')
    // if a colon is the last character entered
    {
      if (this.timerInput.length == 1)
      // if the colon is the first character
      {
        // populate hours as zero
        this.timerInput = '00:';
        return;
      } else if (this.timerInput.length == 2)
      // if the colon is the second character
      {
        // add a trailing zero
        this.timerInput = '0' + this.timerInput + ':';
        return;
      } else if (this.timerInput.length > 3)
      // if the colon is not the third character
      {
        // remove the colon
        this.timerInput = this.timerInput.substring(0,this.timerInput.length-1)
        return;
      } else {
        return;
      }
    } else if (!this.timerInput.substring(this.timerInput.length - 1).match('[0-9]'))
    // if the last character entered is not a digit (or a colon)
    {
      // remove the character
      this.timerInput = this.timerInput.substring(0,this.timerInput.length-1);
      return;
    } else if (this.timerInput.substring(this.timerInput.length - 1).match('[0-9]'))
    // if the last character entered is a digit
    {
      if (this.timerInput.length < 3){
        return;
      } else if (this.timerInput.length == 3){
        this.timerInput = this.timerInput.substring(0,2) + ':' + this.timerInput.substring(2);
        return
      } else if (this.timerInput.length <= 5){
        return
      } else {
        this.timerInput = this.timerInput.substring(0,this.timerInput.length-1)
        return;
      }
    }

  }

  ngOnInit() {
    if(localStorage['brewtimer']){
      this.brewtimer = JSON.stringify(localStorage['brewtimer']);
    } else {
      localStorage['brewtimer'] = '';
    }
  }
}
