import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gravity',
  templateUrl: './gravity.component.html',
  styleUrls: ['./gravity.component.css']
})
export class GravityComponent implements OnInit {
  currentUnit:string = "Specific Gravity";
  currentEntry:string;
  validEntry:boolean = false;
  gravity:Array<number>;
  re = /[0-9.]/;
  changeUnit(){
    if(this.currentUnit == 'Specific Gravity'){
      this.currentUnit = 'Brix / Plato';
    } else {
      this.currentUnit = 'Specific Gravity';
    }
  }
  validateEntry(){
    if(!this.currentEntry){return}
    var newEntry:string = '';
    for (var i = 0, len = this.currentEntry.length; i < len; i++){
      if (this.currentEntry[i].match(this.re)){
        newEntry += this.currentEntry[i];
      }
    }
    this.currentEntry = newEntry;
    if(parseFloat(this.currentEntry) >= .98 && parseFloat(this.currentEntry) <= 1.2){
      this.validEntry = true;
    } else {
      this.validEntry = false;
    }
  }
  addEntry(){
    if (parseFloat(this.currentEntry) < .98 || parseFloat(this.currentEntry) > 1.2){return}
    if (!this.gravity){
      this.gravity = [parseFloat(this.currentEntry)];
    } else {
      this.gravity.push(parseFloat(this.currentEntry));
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
