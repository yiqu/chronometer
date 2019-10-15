import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: 'loading.component.html',
  styleUrls: ['./loading.component.css']
})

export class LoadingComponent implements OnInit {

  loadingImgUrl: string = "assets/password.png";


  constructor() { }

  ngOnInit() { }
}