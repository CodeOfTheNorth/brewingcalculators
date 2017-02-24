import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  template: ``
})
export class NotFoundComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    this._router.navigate(['/']);
  }

}
