import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gravity',
  templateUrl: './gravity.component.html',
  styleUrls: ['./gravity.component.css']
})
export class GravityComponent implements OnInit {
  editing:number= -1;
  currentUnit:string = "Specific Gravity";
  currentEntry:string;
  validEntry:boolean = false;
  gravity:Array<number>;
  re = /[0-9.]/;
  ABV:number;
  apparentAttenuation:number;
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
    this.validEntry = false;
    this.currentEntry = '';
    this.updateOutput();
  }
  editEntry(i){
    this.editing = i;
  }
  saveEntry(i){
    if (parseFloat(this.currentEntry) < .98 || parseFloat(this.currentEntry) > 1.2){return}
    this.gravity[i]=parseFloat(this.currentEntry);
    this.validEntry = false;
    this.currentEntry = '';
    this.editing = -1;
    this.updateOutput();
  }
  removeEntry(i){
    this.gravity.splice(i, 1);
    this.updateOutput();
  }
  updateOutput(){
    if(this.gravity.length >=2 ){
      var OG = this.gravity[0]
      var FG = this.gravity[this.gravity.length-1]
      if(OG>FG){
        this.ABV = Math.round((OG - FG) * 13100) / 100;
        this.apparentAttenuation = Math.round((OG - FG) * 100000) / 100;
      }
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
