import { Component, OnInit } from '@angular/core';
import { DepthType } from 'src/app/enums/depth-type';
import { ProductionMonitoringService } from 'src/app/services/productionMonitoring.service';
import {Periodicity} from '../../../enums/periodicity';

@Component({
  selector: 'app-depth-time',
  templateUrl: './depth-time.component.html',
  styleUrls: ['./depth-time.component.css']
})
export class DepthTimeComponent implements OnInit {
depthType: DepthType;
data: Object;

  constructor(private httpClient: ProductionMonitoringService) { }

  ngOnInit(): void {
  }

  onClickBtn(name: string){
    let period;
    switch (name) {
      case '24H':
        period = Periodicity.Hours24;
        break;
      case '7D':
        period = Periodicity.Days7;
        break;
      case '30D':
        period = Periodicity.Days30;
        break;
      case '60D':
        period = Periodicity.Days60;
        break;
      case '90D':
        period = Periodicity.Days90;
        break;
      case '1Y':
        period = Periodicity.OneYear;
        break;
      case 'All':
        period = Periodicity.All;
        break;
      default:
        break;
    }

    this.httpClient.periodicity.next(period);
  }
}
