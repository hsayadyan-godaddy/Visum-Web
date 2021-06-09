import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-monitoring',
  templateUrl: './production-monitoring.component.html',
  styleUrls: ['./production-monitoring.component.css']
})
export class ProductionMonitoringComponent implements OnInit {
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

onClickBtn(name: string){
alert(name);
}

  ngOnInit(): void {
  }

}
