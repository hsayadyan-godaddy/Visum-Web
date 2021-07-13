import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Productionmonitoring } from 'src/app/models/productionmonitoring/productionmonitoring';
import { Well } from 'src/app/models/well';
import { ProductionMonitoringService } from 'src/app/services/productionMonitoring.service';
import { WebsocketUsageExampleService } from '../../services/websocket/websocket-usage-example-service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './production-monitoring.component.html',
  styleUrls: ['./production-monitoring.component.css']
})
export class ProductionMonitoringComponent implements OnInit {
  selected = '';
  userId: string = "";
  wells : Well[];
  pmData : Productionmonitoring;
  

    constructor(private exampleWS: WebsocketUsageExampleService,
    private _pmService: ProductionMonitoringService
    ) { }

  //TODO rename
  getData() :  void
  {
     this._pmService.getData(this.pmData).subscribe((data : Productionmonitoring)=>{
        this.pmData = data;
    });
  }


onClickBtn(name: string){
alert(name);
}

  ngOnInit(): void {
  //  this.getWells();
  }

}
