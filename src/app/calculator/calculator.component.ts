import { Component } from '@angular/core';
import { CalcsService } from '../calcs.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  hideSearch:boolean;
  calcs:any[];
  search:string;
  constructor(private _calcsService: CalcsService) {
    this.hideSearch = false;
    this.displayCalcs();
  }
  toggleSearch(){ this.hideSearch = !this.hideSearch;
  console.log(this.hideSearch) }
  searchCalcs(){
    this._calcsService.searchCalcs(this.search).subscribe(calcs => {
      this.calcs = calcs;
    },
    error => console.log(error));
  }
  displayCalcs(){
    this._calcsService.getCalcs().subscribe(calcs => {
      this.calcs = calcs;
      console.log(calcs);
    },
    error => console.log(error));
  }

}
