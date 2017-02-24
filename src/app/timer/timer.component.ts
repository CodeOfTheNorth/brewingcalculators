import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timerInput:string;
  brewtimer:any;
  _regex:any;
  constructor() {
    //One Character
    //var first = /^\d$/;
    //Two Characters
    //var second = /^\d{2}$/;
    //Three Characters
    //var third = /^\d{2}:$/;
    //Four Characters
    //var fourth = /^\d{2}:\d$/;
    //Five Characters
    //var fifth = /^\d{2}:\d{2}$/;
    //Combined!!!
    this._regex = /(?:^\d$)|(?:^\d{2}$)|(?:^\d{2}:$)|(?:^\d{2}:\d$)|(?:^\d{2}:\d{2}$)/;
  }
  setTimer(){
    if (this.timerInput){
      if(this.timerInput.match(this._regex)){
        var hours = parseInt(this.timerInput.substring(0,2));
        var minutes = parseInt(this.timerInput.substring(3,5));
        var milliseconds = (hours * 60 + minutes) * 60000;
        console.log(new Date(milliseconds).toTimeString());
        console.log(new Date(milliseconds + Date.now()).toLocaleTimeString());
      } else {
        console.log('failing match!!');
      }
    }

  }
  validateTimerInput(){
    if(!this.timerInput.match(this._regex)){
      // erase button-smashing results
      this.timerInput = '';
      return;
    } else if (this.timerInput.length == 0)
    // keyup event could be a backspace leaving us with an empty string.
    {
      return;
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
