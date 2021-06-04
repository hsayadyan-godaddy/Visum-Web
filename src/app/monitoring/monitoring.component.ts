import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {
  selected = 'Well1';

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor() { }

  onClickCompare(){
    alert('Compare');
  }

  onClickComment(){
    alert('Comment');
  }

  onClickDisplay(){
    alert('Display');
  }

  onClickChart(){
    alert('Chart');
  }

  onClickMD(){

  }
onClickTVD(){

}
onClickTVDSS(){
  
}

  ngOnInit(): void {
  }

}
