import { Component, OnInit } from '@angular/core';
import { CalcsService } from '../calcs.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _calcsService: CalcsService) { }

  ngOnInit() {
  }

}
