import {Component, OnInit} from '@angular/core';
import {ProductionMonitoringService} from '../../../services/productionMonitoring.service';
import {Periodicity} from '../../../enums/periodicity';
import {ZoneFlowProductionHistoryDataCommand} from '../../../models/Request/ZoneFlowProductionHistoryDataCommand';
import {DepthType} from '../../../enums/depth-type';
import {ZoneFlowTimeOilWaterGas} from '../../../models/productionmonitoring/ZoneFlowTimeOilWaterGas';
import {WsFlowMonitoringService} from '../../../services/ws-production-monitoring/ws-flow-monitoring.service';

@Component({
  selector: 'app-zone-flow-allocation',
  templateUrl: './zone-flow-allocation.component.html',
  styleUrls: ['./zone-flow-allocation.component.scss']
})

export class ZoneFlowAllocationComponent implements OnInit {
  displayedColumns: string[] = ['zone', 'oil', 'water', 'gas'];
  dataSource: ZoneFlowTimeOutOfLimitOilWaterGas[] = [];

  constructor(
    private productionMonitoringService: ProductionMonitoringService,
    private wsFlowMonitoringService: WsFlowMonitoringService
  ) { }

  private command: ZoneFlowProductionHistoryDataCommand;

  ngOnInit() {
    this.wsFlowMonitoringService.onZoneFlowTimeOilWaterGas.subscribe(data => {
      let oilTotal = 0;
      let waterTotal = 0;
      let gasTotal = 0;

      for (let i = 0; i < this.dataSource.length - 1; i++)
      {
        if (this.dataSource[i].zone === data.request.zoneNumber.toString()){
          this.dataSource[i].oil = data.value.oil;
          this.dataSource[i].water = data.value.water;
          this.dataSource[i].gas = data.value.gas;
        }

        oilTotal += this.dataSource[i].oil;
        waterTotal += this.dataSource[i].water;
        gasTotal += this.dataSource[i].gas;
      }

      this.dataSource[this.dataSource.length - 1].oil = oilTotal;
      this.dataSource[this.dataSource.length - 1].water = waterTotal;
      this.dataSource[this.dataSource.length - 1].gas = gasTotal;
    });

    const snapshotSize = 7;
    for (let i = 1; i < snapshotSize; i++){
      this.wsFlowMonitoringService.subscribeUpdates(i);
    }

    this.command = {
      depthType: DepthType.MD,
      zoneNumber: 3,
      periodicity: Periodicity.Hours24,
      snapshotSize,
      // fromDate?: ,
      // toDate?: ,
      projectId: '60af3d5cdc4e604afc4f8437',
      wellId: 'wellId222'
    };

    this.plotRefresh(this.command);

    this.productionMonitoringService.periodicity.subscribe(periodicity => {
      this.command.periodicity = periodicity;
      this.plotRefresh(this.command);
    });
  }

  private getDataSource(zoneFlowProductionData: ZoneFlowTimeOilWaterGas[]) {
    const data = [];
    let oilTotal = 0;
    let waterTotal = 0;
    let gasTotal = 0;

    for ( let i = 0; i < zoneFlowProductionData.length; i++){
      const dd = zoneFlowProductionData[i];

      oilTotal += dd.oil;
      waterTotal += dd.water;
      gasTotal += dd.gas;

      const date = new Date();
      const zone = i + 1;
      const outOfLimit = false;
      const item = this.createItem(dd, date, zone.toString(), outOfLimit);
      data.push(item);
    }

    const d: ZoneFlowTimeOilWaterGas = {
      time: new Date(),
      oil: oilTotal,
      water: waterTotal,
      gas: gasTotal
    };
    data.push(this.createItem(d, new Date(), 'Total', false));

    return data;
  }

  private createItem(data: ZoneFlowTimeOilWaterGas, date: Date, zone: string, outOfLimit: boolean) {
    const item: ZoneFlowTimeOutOfLimitOilWaterGas = {
      time: date,
      zone,
      outOfLimit,
      oil: data.oil,
      water: data.water,
      gas: data.gas
    };
    return item;
  }

  getClasses(row) {
    let classes = row.Zone === 'Total' ? 'total-row-style' : '';
    classes += row.OutOfLimit ? ' out-of-limit' : '';
    return classes;
  }

  private plotRefresh(command: ZoneFlowProductionHistoryDataCommand) {
    this.productionMonitoringService.getZoneFlowProductionHistoryData(command).subscribe((response) => {
      this.dataSource = this.getDataSource(response.zoneFlowProductionData);
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }
}

export interface ZoneFlowTimeOutOfLimitOilWaterGas extends ZoneFlowTimeOilWaterGas{
  zone: string;
  outOfLimit: boolean;
}
