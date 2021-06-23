import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';
import { WebsocketUsageExampleService } from '../../services/websocket/websocket-usage-example-service';

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

  constructor(private exampleWS: WebsocketUsageExampleService) {
    
   }


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
