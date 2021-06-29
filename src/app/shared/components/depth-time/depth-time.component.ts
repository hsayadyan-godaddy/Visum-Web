import { Component, OnInit } from '@angular/core';
import { DepthType } from 'src/app/enums/depth-type';
import { ProductionMonitoringService } from 'src/app/services/productionMonitoring.service';

@Component({
  selector: 'app-depth-time',
  templateUrl: './depth-time.component.html',
  styleUrls: ['./depth-time.component.css']
})
export class DepthTimeComponent implements OnInit {
depthType : DepthType;
data: Object;


  constructor(private _httpClient:ProductionMonitoringService) { }

  ngOnInit(): void {
  }



onClickBtn(name: string){
  this._httpClient.periodicityValue.next(name);  
  }
}
