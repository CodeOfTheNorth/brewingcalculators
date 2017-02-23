import { Component, OnInit } from '@angular/core';
import { CalcsService } from '../calcs.service';

@Component({
  selector: 'app-post-missing',
  templateUrl: './post-missing.component.html',
  styleUrls: ['./post-missing.component.css']
})
export class PostMissingComponent implements OnInit {
  body:any;
  keyword:string;
  name:string;
  description:string;
  constructor(private _calcsService: CalcsService) { }
  sendKeyword(){
    console.log(this.keyword);
    this.body = {};
    this.body["keyword"] = this.keyword;
    this.body["user_info"] = this.name;
    this.body["description"] = this.description;
    this._calcsService.postMissing(this.body)
      .subscribe(res => {

      });
  }
  ngOnInit() {
  }

}
