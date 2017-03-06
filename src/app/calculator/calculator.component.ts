import { Component } from '@angular/core';
import { CalcsService } from '../calcs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  hideSearch:boolean;
  calcs:any[];
  search:string;
  constructor(private _calcsService: CalcsService, private _router: Router) {
    this.hideSearch = false;
    this.displayCalcs();
  }
  toggleSearch(){
    this.hideSearch = !this.hideSearch;
    if (!this.hideSearch){
      this._router.navigate(['/']);
    }
  }
  searchCalcs(){
    this._calcsService.searchCalcs(this.search).subscribe(calcs => {
      this.calcs = calcs;
    },
    error => console.log(error));
  }
  displayCalcs(){
    this._calcsService.getCalcs().subscribe(calcs => {
      this.calcs = calcs;
      console.log(JSON.stringify(calcs));
    },
    error => console.log(error));
  }

}
