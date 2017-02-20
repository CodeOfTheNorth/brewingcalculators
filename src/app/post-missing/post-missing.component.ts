import { Component, OnInit } from '@angular/core';
import { CalcsService } from '../calcs.service';

@Component({
  selector: 'app-post-missing',
  templateUrl: './post-missing.component.html',
  styleUrls: ['./post-missing.component.css']
})
export class PostMissingComponent implements OnInit {

  constructor(private _calcsService: CalcsService) { }

  ngOnInit() {
  }

}
