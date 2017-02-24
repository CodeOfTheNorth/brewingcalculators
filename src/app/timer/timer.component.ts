import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timerInput:string;
  brewtimer:any;
  constructor() { }

  setTimer(){
    if (this.timerInput){
      if(this.timerInput.match(/\d{2}:\d{2}$/)){
        var hours = parseInt(this.timerInput.substring(0,2));
        var minutes = parseInt(this.timerInput.substring(3,5));
        var milliseconds = (hours * 60 + minutes) * 60000;
        console.log(new Date(milliseconds).toTimeString());
        console.log(new Date(milliseconds + Date.now()).toLocaleTimeString());
      }
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
