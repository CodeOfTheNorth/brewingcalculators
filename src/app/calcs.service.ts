import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Rx';

@Injectable()
export class CalcsService {
  api: any[];

  constructor(private _http: Http) {
    // fetch api routes from api.json.
    this._http.get('../api.json')
      .subscribe(res => this.api = res.json());
  }

}
