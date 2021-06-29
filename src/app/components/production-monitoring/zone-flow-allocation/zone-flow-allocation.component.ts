import {Component, OnInit} from '@angular/core';
import {ProductionMonitoringService} from '../../../services/productionMonitoring.service';
import {Periodicity} from '../../../enums/periodicity';
import {ZoneFlowProductionHistoryDataCommand} from '../../../models/Request/ZoneFlowProductionHistoryDataCommand';
import {DepthType} from '../../../enums/depth-type';
import {ZoneFlowTimeOilWaterGas} from '../../../models/productionmonitoring/ZoneFlowTimeOilWaterGas';

@Component({
  selector: 'app-zone-flow-allocation',
  templateUrl: './zone-flow-allocation.component.html',
  styleUrls: ['./zone-flow-allocation.component.scss']
})

export class ZoneFlowAllocationComponent implements OnInit {
  displayedColumns: string[] = ['zone', 'oil', 'water', 'gas'];
  dataSource: any[] = [];

  constructor(
    private productionMonitoringService: ProductionMonitoringService
  ) { }

  ngOnInit() {
    const command: ZoneFlowProductionHistoryDataCommand = {
      depthType: DepthType.MD,
      zoneNumber: 3,
      periodicity: Periodicity.Hours24,
      snapshotSize: 7,
      // fromDate?: ,
      // toDate?: ,
      projectId: '60af3d5cdc4e604afc4f8437',
      wellId: 'wellId222'
    };

    this.productionMonitoringService.getZoneFlowProductionHistoryData(command).subscribe((response) => {
      this.dataSource = this.GetDataSource(response.zoneFlowProductionData);
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  private GetDataSource(zoneFlowProductionData: ZoneFlowTimeOilWaterGas[]) {
    const data = [];
    let oilTotal = 0;
    let waterTotal = 0;
    let gasTotal = 0;

    for ( let i = 0; i < zoneFlowProductionData.length; i++){
      const d = zoneFlowProductionData[i];

      oilTotal += d.oil;
      waterTotal += d.water;
      gasTotal += d.gas;

      data.push({
        // "Zone": ,
        OutOfLimit: false,
        Oil: d.oil.toFixed(2),
        Water: d.water.toFixed(2),
        Gas: d.gas.toFixed(2)
      });
    }

    data.push({
      Zone: 'Total',
      OutOfLimit: false,
      Oil: oilTotal.toFixed(2),
      Water: waterTotal.toFixed(2),
      Gas: gasTotal.toFixed(2)
    });

    return data;
  }

  getClasses(row) {
    let classes = row.Zone === 'Total' ? 'total-row-style' : '';
    classes += row.OutOfLimit ? ' out-of-limit' : '';
    return classes;
  }
}
