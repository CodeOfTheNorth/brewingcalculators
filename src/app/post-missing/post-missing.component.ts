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
  keywords:any[];
  constructor(private _calcsService: CalcsService) {
    this.getKeywords();
  }
  sendKeyword(){
    this.body = {};
    this.body["keyword"] = this.keyword;
    this.body["user_info"] = this.name;
    this.body["description"] = this.description;
    this._calcsService.postMissing(this.body)
      .subscribe(res => { this.body = res
      });
    this.keyword = '';
    this.name = '';
    this.description = '';
    setTimeout(() =>this.getKeywords(), 500);
  }
  getKeywords(){
    this._calcsService.getMissing().subscribe(keywords => {
      this.keywords = keywords;
    },
    error => console.log(error));
  }
  ngOnInit() {
  }

}
