import {
  Component,
  OnInit,
} from '@angular/core';

import * as Plotly from 'plotly.js-dist';

import { ZoneFlowProductionHistoryDataCommand } from '../../../models/Request/ZoneFlowProductionHistoryDataCommand';
import { DepthType } from '../../../enums/depth-type';
import { Periodicity } from '../../../enums/periodicity';
import { WellboreProfileZonesCommand } from '../../../models/Request/WellboreProfileZonesCommand';
import { WellboreProfileZonesResponse } from '../../../models/Response/WellboreProfileZonesResponse';
import { ZoneFlowProductionHistoryDataResponse } from '../../../models/Response/ZoneFlowProductionHistoryDataResponse';
import { ProductionMonitoringService } from '../../../services/productionMonitoring.service';
import { WsZoneFlowMonitoringService } from '../../../services/ws-production-monitoring/ws-zone-flow-monitoring.service';

@Component({
  selector: 'app-zone-flow-allocation-chart',
  templateUrl: './zone-flow-allocation-chart.component.html',
  styleUrls: ['./zone-flow-allocation-chart.component.scss'],

})
export class ZoneFlowAllocationChartComponent implements OnInit {

  public depthTypes = Object.values(DepthType);
  public selectedDepth: string = DepthType.MD; // remove const
  public wellboreProfileZonesResponse: WellboreProfileZonesResponse;

  private totalZones: number = 0;
  private wellId: string = 'WellId';
  private projectId: string = 'ProjectId'
  //TODO: replace this with data query parameter service
  private request: WellboreProfileZonesCommand = {
    wellId: this.wellId,
    projectId: this.projectId,
    depthType: DepthType[this.selectedDepth],
  }
  private zoneFlowDataList: ZoneFlowProductionHistoryDataResponse[];
  private zones: string[] = [];
  private zoneX: number[] = [];
  private depth: number[] = [];
  private allDepths: number[] = [];
  private zoneDepth: string[] = [];
  private period: Periodicity;
  private xData: Date[] = [];
  private chartHeight: number = 0;

  constructor(
    private productionMonitoringService: ProductionMonitoringService,
    private wsZoneFlowMonitoringService: WsZoneFlowMonitoringService
  ) { }

  ngOnInit() {
    this.getZoneDetailData();
    this.productionMonitoringService.periodicity.subscribe(async (value) => {
      this.period = value;
      this.plotRefresh();
    });
  }

  subscribeUpdates() {
    for (let zoneNum = 1; zoneNum <= this.totalZones; zoneNum++) {
      const parameters: ZoneFlowProductionHistoryDataCommand = {
        projectId: '0EA456-45CD89456-1237-8F8A',
        wellId: 'LONG-HOLE-003',
        zoneNumber: zoneNum,
        depthType: this.selectedDepth as DepthType,
        periodicity: this.period,
        snapshotSize: 100
      };
      this.wsZoneFlowMonitoringService.subscribeUpdates(
        parameters
      );
    }
  }

  getSubscribedData() {
    this.wsZoneFlowMonitoringService.onZoneFlowTimeOilWaterGas.subscribe(
      (data) => {
        const y = (-data.value.oil - data.value.gas - data.value.water) * 200;
        const update = {
          y: [[y]],
          x: [[data.value.time]],
         'customdata': [[data.value]]
        }

        Plotly.extendTraces('zoneFlowAllocation', update, [data.request.zoneNumber - 1]);
      }
    );
  }

  async getZoneDetailData() {
    this.wellboreProfileZonesResponse =
      await this.productionMonitoringService.getWellboreProfileZones(
        this.request
      );
    var zoneInfoData = this.wellboreProfileZonesResponse.zoneInfoData;
    this.totalZones = zoneInfoData.length;
    zoneInfoData.forEach((z, index) => {
      this.depth.push((z.depthTo + z.depthFrom) / 2);
      this.allDepths.push(z.depthFrom);
      if (index == zoneInfoData.length - 1) {
        this.allDepths.push(z.depthTo);
      }
      this.zoneX.push(0);
      this.zones.push(`ZONE ${z.zoneNumber}`);
      this.zoneDepth.push(`From: ${z.depthFrom} To: ${z.depthTo}`);
    });
    this.plotRefresh();
    this.subscribeUpdates();
    this.getSubscribedData();
  }

  plotRefresh() {
    this.getZoneFlowAllocationData();
  }

  async getZoneFlowAllocationData() {

    let zoneFlowProductionHistoryDataCommand: ZoneFlowProductionHistoryDataCommand = {
      zoneNumber: 1,
      depthType: this.selectedDepth as DepthType,
      periodicity: this.period,
      snapshotSize: 500,
      projectId: this.projectId,
      wellId: this.wellId
    };

    await this.productionMonitoringService
      .getZoneFlowRateDataFromMultipleZones(
        zoneFlowProductionHistoryDataCommand,
        this.totalZones
      )
      .then((data) => {
        this.chartHeight = 35 * this.totalZones;
        this.zoneFlowDataList = data;
      });

    if (this.zoneFlowDataList.length > 0) {
      this.xData = this.zoneFlowDataList[0].zoneFlowProductionData.map(
        (flow) => new Date(flow.time)
      );
      this.plotGraph();
    }
  }


  getShapes(zoneNum: number) {
    let shapes = [];
    if (zoneNum % 2 == 0) {
      let shapeForChart = {
        type: 'rect',
        layer: 'below',
        xref: 'x', yref: 'y',
        x0: this.xData[0], x1: this.xData[this.xData.length - 1],
        y0: this.allDepths[zoneNum], y1: this.allDepths[zoneNum + 1],
        opacity: 0.3,
        fillcolor: 'grey',
        line: {
          color: 'grey'
        }
      }
      let shapeForZone = {
        type: 'rect',
        layer: 'below',
        xref: 'x2', yref: 'y',
        x0: -1, x1: 2,
        y0: this.allDepths[zoneNum], y1: this.allDepths[zoneNum + 1],
        opacity: 0.3,
        fillcolor: 'grey',
        line: {
          color: 'grey'
        }
      }
      shapes.push(shapeForChart);
      shapes.push(shapeForZone);
    }
    return shapes;
  }

  getTracesAndShapes() {
    let traces = [];
    let shapes = [];
    if (this.zoneFlowDataList) {

      this.zoneFlowDataList.forEach((zoneFlowData, index) => {
        traces.push(this.getBarChartTrace(zoneFlowData));
        shapes = shapes.concat(this.getShapes(index));
      });

      traces.push(this.getTraceForZone());
    }
    return { 'traces': traces, 'shapes': shapes };
  }

  plotGraph() {
    const data = this.getTracesAndShapes();
    const layout = {
      yaxis: {
        showline: true,
        showgrid: false,
        ticks: 'outside',
        name: 'y1',
        ticklength: 8,

        tick0: this.depth[0],
        dtick: 2500,
        zeroline: false,
        title: {
          text: 'MEASURED DEPTH (ft)',
          font: {
            size: 10,
          },
        },
        titlefont: { color: '#1f77b4' },
        tickfont: { color: '#1f77b4' },
        tickcolor: '#1f77b4',
        anchor: 'free',
        overlaying: 'y',
        position: 1.01,
        autorange: 'reversed'
      },
      xaxis: {
        type: 'date',
        autorange: true,
        showgrid: true,
        visible: true,
        title: {
          text: 'HOURS',
          font: {
            size: 10,
          },
        },
        titlefont: { color: '#1f77b4' },
        tickfont: { color: '#1f77b4' },
        tickcolor: '#1f77b4',
        domain: [0.06, 1],
      },
      xaxis2: {
        domain: [0, 0.06],
        visible: false,
        autorange: false,
        range: [-0.2, 1.5],
      },
      shapes: data.shapes,
      // width: 1300,
      height: this.chartHeight,
      paper_bgcolor: 'white',
      plot_bgcolor: 'white',
      showlegend: false,
      hovermode: 'closest',
    };

    Plotly.newPlot('zoneFlowAllocation', data.traces, layout, { responsive: true });
  }

  getTraceForZone() {
    return {
      type: 'scatter',
      x: this.zoneX,
      y: this.depth,
      yaxis: 'y1',
      xaxis: 'x2',
      mode: 'text',
      text: this.zones,
      customdata: this.zoneDepth,
      name: '',
      textposition: 'middle right',
      textfont: {
        size: 11,
        color: '#1f77b4',
      },
      hovertemplate: '<b>Zone Range</b><br> %{customdata}',
    };
  }

  getBarChartTrace(
    zoneFlowData: ZoneFlowProductionHistoryDataResponse,
  ): {} {
    const zoneInfo = this.wellboreProfileZonesResponse.zoneInfoData.find(
      (z) => z.zoneNumber == zoneFlowData.zoneNumber
    );
    let ydata = zoneFlowData.zoneFlowProductionData.map(
      (flow) => -flow.oil - flow.water - flow.gas
    );
    let ydata2 = zoneFlowData.zoneFlowProductionData.map(
      (flow) => flow.oil + flow.water + flow.gas
    );

    const traces = {
      x: this.xData,
      y: ydata.map((yval) => yval * 200),
      type: 'bar',
      xaxis: 'x1',
      base: zoneInfo.depthTo,
      width: 6000,
      customdata: zoneFlowData.zoneFlowProductionData,
      showgrid: true,
      showline: true,
      marker: {
        color: ydata2,
        colorscale: 'Blues'
      },
      bargap: 0,
      hovertemplate:
        'Oil: %{customdata.oil:,}<br>' +
        'Water: %{customdata.water:,}<br>' +
        'Gas: %{customdata.gas:,}' +
        '<extra></extra>'
    };
    return traces;
  }

  onChange(newDepth) {
    this.selectedDepth = newDepth;
    this.getZoneDetailData();
  }
}
