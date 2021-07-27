import { Component } from '@angular/core';
import { Well } from 'src/app/models/well';
import { Productionmonitoring } from '../../models/productionmonitoring/productionmonitoring';
import { ProductionMonitoringService } from '../../services/productionMonitoring.service';
import { WebsocketUsageExampleService } from '../../services/websocket/websocket-usage-example-service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './production-monitoring.component.html',
  styleUrls: ['./production-monitoring.component.css'],
})
export class ProductionMonitoringComponent {
  selected = '';

  userId: string = '';

  wells : Well[];

  pmData : Productionmonitoring;

  constructor(private exampleWS: WebsocketUsageExampleService,
    private pmService: ProductionMonitoringService) { }

  // TODO rename
  getData() : void {
    this.pmService.getData(this.pmData).subscribe((data : Productionmonitoring) => {
      this.pmData = data;
    });
  }

  onClickBtn(name: string) {
    alert(name);
  }
}
