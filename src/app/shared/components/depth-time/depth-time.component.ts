import { Component, OnInit } from '@angular/core';
import { DepthType } from 'src/app/enums/depth-type';

@Component({
  selector: 'app-depth-time',
  templateUrl: './depth-time.component.html',
  styleUrls: ['./depth-time.component.css']
})
export class DepthTimeComponent implements OnInit {
depthType : DepthType;
data: Object;


  constructor() { }

  ngOnInit(): void {
  }



onClickBtn(name: string){
  alert(name);
  }
}
