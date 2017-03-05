import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-gravity',
  templateUrl: './gravity.component.html',
  styleUrls: ['./gravity.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GravityComponent implements OnInit {
  snackMessage: string = 'Snack Bar opened.';
  snackAction: string = 'Retry';

  editing:number= -1;
  currentUnit:string = "Specific Gravity";
  currentTool:string = "Hydrometer";
  currentEntry:string;
  validEntry:boolean = false;
  gravity:Array<number>= [];
  gravityBrix:Array<number>= [];
  re = /[0-9.]/;
  ABV:number;
  apparentAttenuation:number;
  updateStorage(){
    localStorage['gravity'] = JSON.stringify(this.gravity);
  }
  changeTool(){
    if(this.currentTool=='Hydrometer'){
      this.currentTool='Refractometer';
      this.validateEntry(); // necessary if we are currently adding or editing a value
    } else {
      this.currentTool='Hydrometer';
      this.validateEntry(); // necessary if we are currently adding or editing a value
    }
  }
  changeUnit(){
    if(this.currentUnit == 'Specific Gravity'){
      this.currentUnit = 'Brix';
      this.validateEntry(); // necessary if we are currently adding or editing a value
      this.updateGravityBrix(); // Updates the display to Brix
    } else {
      this.currentUnit = 'Specific Gravity';
      this.validateEntry(); // necessary if we are currently adding or editing a value
    }
  }
  validateEntry(){
    if(!this.currentEntry){return} // handles a backspace to an empty input
    var newEntry:string = '';
    for (var i = 0, len = this.currentEntry.length; i < len; i++){ // check to see if the input is valid by iterating over each character
      if (this.currentEntry[i].match(this.re)){
        newEntry += this.currentEntry[i]; // append valid characters onto the entry string
      }
    }
    this.currentEntry = newEntry; // bind the variable to the validated string
    if(this.currentUnit=='Specific Gravity'){ // warn about numbers out of range for SG
      if(parseFloat(this.currentEntry) >= .98 && parseFloat(this.currentEntry) <= 1.2){
        this.validEntry = true;
      } else {
        this.validEntry = false;
      }
    } else { // warn about numbers out of range for Brix
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
        this.addSG(); // we're already in SG, so just add it.
      } else {
        this.convertSG(); // we're in Brix, so we need to convert first.
        this.addSG();
      }
    } else { // if you're using a refractometer
      if (this.gravity.length == 0){ // if it's unfermented, an ethanol correction is not needed, we handle just like a hydrometer reading
        if(this.currentUnit == 'Specific Gravity'){
          this.addSG();
        } else {
          this.convertSG();
          this.addSG();
        }
      } else { // if there's an OG value already, it implies fermentation so we correct for ethanol
        if(this.currentUnit == 'Specific Gravity'){
          this.currentEntry = this.convertBrix(parseFloat(this.currentEntry)); // convert to brix first
          var OG = this.gravity[0]; // fetch OG number (in SG)
          var OB = parseFloat(this.convertBrix(OG)); // convert it to brix
          this.ethanolCorrect(OB, parseFloat(this.currentEntry)); // perform an ethanol correction, outputs value in SG
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
    if (this.currentTool == 'Hydrometer' || i == 0){
      if (this.currentUnit == 'Specific Gravity'){
        this.saveEntry(i); // entry is already in SG
      } else {
        this.convertSG(); // entry needs to be converted to SG
        this.saveEntry(i);
      }
    }  else { // if you're using a refractometer
      if (this.gravity.length == 0){ // if it's unfermented, handle like hydrometer
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
    // formula derived from 69th edition CRC handbook of Chemistry and Physics, "Concentrative Properties of Aqueous Solutions: Conversion Tables", Table 88 Sucrose
    // MathCAD was used to curvefit the data for Degrees Brix @ 20 C (%sucrose by weight) and specific gravity @15 C
    var SG = 1.001843 - 0.002318474*OB - 0.000007775*OB*OB - 0.000000034*OB*OB*OB + 0.00574*FB + 0.00003344*FB*FB + 0.000000086*FB*FB*FB;
    this.currentEntry = SG.toString();
  }
  convertSG(){
    var brix = parseFloat(this.currentEntry);
    var SG = brix / (258.6 - brix * .87955)+1;
    this.currentEntry = SG.toString();
  }
  convertBrix(SG:number){
    var brix = ((5172000*(SG - 1))/(17591*SG+2409)).toString();
    return brix
  }
  addSG(){
    if (parseFloat(this.currentEntry) >= .98 && parseFloat(this.currentEntry) <= 1.2){
      this.gravity.push(parseFloat(this.currentEntry));
    } else {
      this.snackMessage = 'Refractometer adjustment out of range';
      this.openSnack();
    }
    this.validEntry = false; // reset the entry fields
    this.currentEntry = ''; // reset the entry fields
    this.updateOutput();
    this.updateGravityBrix();
    this.updateStorage();
  }
  editEntry(i){
    this.editing = i; // shows and hides appropriate fields in the DOM
  }
  saveEntry(i){
    if (parseFloat(this.currentEntry) >= .98 && parseFloat(this.currentEntry) <= 1.2){
      this.gravity[i]=parseFloat(this.currentEntry); // update the proper value
    } else {
      this.snackMessage = 'Refractometer adjustment out of range';
      this.openSnack();
    }
    this.validEntry = false;
    this.currentEntry = '';
    this.editing = -1;
    this.updateOutput();
    this.updateGravityBrix();
    this.updateStorage();
  }
  removeEntry(i){
    this.gravity.splice(i, 1);
    this.editing = -1;
    this.updateOutput();
    this.updateGravityBrix();
    this.updateStorage();
  }
  updateOutput(){
    if(this.gravity.length >=2 ){ // we're only showing the update when we have two data points
      var OG = this.gravity[0]; // get our first gravity value (implies OG)
      var FG = this.gravity[this.gravity.length-1]; // get our last gravity value (implies FG)
      if(OG>FG){
        this.ABV = Math.round((OG - FG) * 13100) / 100; // Simple ABV calculation
        this.apparentAttenuation = Math.round(((OG - FG)/(OG-1)) * 100000) / 1000; // please note this is APPARENT attenuation. Real attenuation to come
      }
    } else { // we need to purge our result data if we remove enough gravity readings so that we no longer have two data points
      this.ABV = undefined;
      this.apparentAttenuation = undefined;
    }
  }
  updateGravityBrix(){
    this.gravityBrix = []; // reset the Brix array
    if(this.gravity.length > 0 ){
      for(var i = 0, len = this.gravity.length; i < len; i++){ // iterate over the SG array
        this.gravityBrix.push(parseFloat(this.convertBrix(this.gravity[i]))); // convert to brix and push to brix array.
      }
    }
  }
  constructor(public snackBar: MdSnackBar){}
  openSnack() {
    let config = new MdSnackBarConfig();
    config.duration = 6000;
    this.snackBar.open(this.snackMessage, this.snackAction, config);
  }
  ngOnInit(
  ) {
    if(localStorage['gravity']){
      this.gravity = JSON.parse(localStorage['gravity']);
      this.updateOutput();
    }
  }

}
