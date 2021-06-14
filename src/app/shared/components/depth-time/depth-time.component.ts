import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-depth-time',
  templateUrl: './depth-time.component.html',
  styleUrls: ['./depth-time.component.css']
})
export class DepthTimeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



onClickBtn(name: string){
  alert(name);
  }
}
