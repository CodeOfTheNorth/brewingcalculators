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

  validateTimerInput(){
    // keyup event could be a backspace leaving us with an empty string.
    if (this.timerInput.length == 0){
      return
    } else if (this.timerInput.substring(this.timerInput.length - 1) == ':')
    // if a colon is the last character entered
    {
      if (this.timerInput.length == 1)
      // if the colon is the first character
      {
        // populate hours as zero
        this.timerInput = '00:';
        return
      } else if (this.timerInput.length == 2)
      // if the colon is the second character
      {
        // add a trailing zero
        this.timerInput = '0' + this.timerInput + ':';
      } else if (this.timerInput.length > 3)
      // if the colon is not the third character
      {
        // remove the colon
        this.timerInput = this.timerInput.substring(0,this.timerInput.length-1)
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
