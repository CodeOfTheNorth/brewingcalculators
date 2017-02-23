import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CalcsService {
  api = 'https://api.masiul.is/';
  constructor(private _http: Http) {}
  getCalcs() : Observable<any[]> {
    return this._http.get(this.api+'calcs?')
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchCalcs(str:string) : Observable<any[]> {
    return this._http.get(this.api+'calc_search?keywords=ilike.*' + str)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  postMissing(body:any) : Observable<any[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let preparedBody = body;
    return this._http.post(this.api + 'suggested_keywords', preparedBody, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }
}
