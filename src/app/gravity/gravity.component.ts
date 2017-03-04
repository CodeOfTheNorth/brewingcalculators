import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gravity',
  templateUrl: './gravity.component.html',
  styleUrls: ['./gravity.component.css']
})
export class GravityComponent implements OnInit {
  editing:number= -1;
  currentUnit:string = "Specific Gravity";
  currentTool:string = "Hydrometer";
  currentEntry:string;
  validEntry:boolean = false;
  gravity:Array<number>= [];
  re = /[0-9.]/;
  ABV:number;
  apparentAttenuation:number;
  changeTool(){
    if(this.currentTool=='Hydrometer'){
      this.currentTool='Refractometer';
      this.validateEntry();
    } else {
      this.currentTool='Hydrometer';
      this.validateEntry();
    }
  }
  changeUnit(){
    if(this.currentUnit == 'Specific Gravity'){
      this.currentUnit = 'Brix / Plato';
      this.validateEntry();
    } else {
      this.currentUnit = 'Specific Gravity';
      this.validateEntry();
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
    if(this.currentUnit=='Specific Gravity'){
      if(parseFloat(this.currentEntry) >= .98 && parseFloat(this.currentEntry) <= 1.2){
        this.validEntry = true;
      } else {
        this.validEntry = false;
      }
    } else {
      if(parseFloat(this.currentEntry) >= 0 && parseFloat(this.currentEntry) <= 40){
        this.validEntry = true;
      } else {
        this.validEntry = false;
      }
    }
  }
  addEntry(){
    if (this.currentTool == 'Hydrometer'){
      if (this.currentUnit == 'Specific Gravity'){
        this.addSG();
      } else {
        this.convertSG();
        this.addSG();
      }
    } else { // if you're using a refractometer
      if (this.gravity.length == 0){ // if it's unfermented
        if(this.currentUnit == 'Specific Gravity'){
          this.addSG();
        } else {
          this.convertSG();
          this.addSG();
        }
      } else {
        if(this.currentUnit == 'Specific Gravity'){
          this.currentEntry = this.convertBrix(parseFloat(this.currentEntry));
          var OG = this.gravity[0];
          var OB = parseFloat(this.convertBrix(OG));
          this.ethanolCorrect(OB, parseFloat(this.currentEntry));
          // perform an ethanol correction
          this.addSG();
        } else {
          var OG = this.gravity[0];
          var OB = parseFloat(this.convertBrix(OG));
          this.ethanolCorrect(OB, parseFloat(this.currentEntry));
          // perform an ethanol correction
          this.addSG();
        }
      }
    }
  }
  updateEntry(i){
    if (this.currentTool == 'Hydrometer'){
      if (this.currentUnit == 'Specific Gravity'){
        this.saveEntry(i);
      } else {
        this.convertSG();
        this.saveEntry(i);
      }
    }  else { // if you're using a refractometer
      if (this.gravity.length == 0){ // if it's unfermented
        if(this.currentUnit == 'Specific Gravity'){
          this.saveEntry(i);
        } else {
          this.convertSG();
          this.saveEntry(i);
        }
      } else {
        if(this.currentUnit == 'Specific Gravity'){
          this.currentEntry = this.convertBrix(parseFloat(this.currentEntry));
          var OG = this.gravity[0];
          var OB = parseFloat(this.convertBrix(OG));
          this.ethanolCorrect(OB, parseFloat(this.currentEntry));
          // perform an ethanol correction
          this.saveEntry(i);
        } else {
          var OG = this.gravity[0];
          var OB = parseFloat(this.convertBrix(OG));
          this.ethanolCorrect(OB, parseFloat(this.currentEntry));
          // perform an ethanol correction
          this.saveEntry(i);
        }
      }
    }
  }
  ethanolCorrect(OB, FB){
    var SG = 1.001843 - 0.002318474*OB - 0.000007775*OB*OB - 0.000000034*OB*OB*OB + 0.00574*FB + 0.00003344*FB*FB + 0.000000086*FB*FB*FB;
    this.currentEntry = (Math.round(SG*1000)/1000).toString();
  }
  convertSG(){
    var brix = parseFloat(this.currentEntry);
    var SG = brix / (258.6 - brix * .87955)+1;
    this.currentEntry = (Math.round(SG*1000)/1000).toString();
  }
  convertBrix(SG:number){
    // var SG = parseFloat(this.currentEntry);
    var brix = (5172000*(SG - 1))/(17591*SG+2409);
    var roundBrix = (Math.round(brix*100)/100).toString();
    return roundBrix;
  }
  addBrix(){

  }
  addSG(){
    if (parseFloat(this.currentEntry) < .98 || parseFloat(this.currentEntry) > 1.2){return}
    this.gravity.push(parseFloat(this.currentEntry));
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
    if(this.gravity.length == 0){this.gravity = []}
    console.log(this.gravity);
    this.editing = -1;
    this.updateOutput();
  }
  updateOutput(){
    if(this.gravity.length >=2 ){
      var OG = this.gravity[0]
      var FG = this.gravity[this.gravity.length-1]
      if(OG>FG){
        this.ABV = Math.round((OG - FG) * 13100) / 100;
        this.apparentAttenuation = Math.round(((OG - FG)/(OG-1)) * 100000) / 1000;
      }
    } else {
      this.ABV = undefined;
      this.apparentAttenuation = undefined;
    }
  }
  constructor(){}

  ngOnInit() {}

}
