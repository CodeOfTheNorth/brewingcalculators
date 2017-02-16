import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CalcsService {
  api = 'https://api.masiul.is/';
  constructor(private _http: Http) {

  }
  // fetch api routes from api.json.
  getCalcs(str?:string) : Observable<any[]> {
    return this._http.get(this.api+'/calcs?'+str)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
