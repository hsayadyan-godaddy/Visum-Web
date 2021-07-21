import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import * as Plotly from 'plotly.js-dist';
import { DepthType } from 'src/app/enums/depth-type';
import { Periodicity } from 'src/app/enums/periodicity';
import { WellboreProfileZonesCommand } from 'src/app/models/Request/WellboreProfileZonesCommand';
import { WellboreProfileZonesResponse } from 'src/app/models/Response/WellboreProfileZonesResponse';
import { ZoneFlowProductionHistoryDataResponse } from 'src/app/models/Response/ZoneFlowProductionHistoryDataResponse';
import { ProductionMonitoringService } from 'src/app/services/productionMonitoring.service';
import { WsZoneFlowMonitoringService } from 'src/app/services/ws-production-monitoring/ws-zone-flow-monitoring.service';

@Component({
  selector: 'app-zone-flow-allocation-chart',
  templateUrl: './zone-flow-allocation-chart.component.html',
  styleUrls: ['./zone-flow-allocation-chart.component.css'],

})
export class ZoneFlowAllocationChartComponent implements OnInit {
  public graph: any;
  public depthTypes = Object.values(DepthType);
  public selectedDepth: string = 'MD';
  public wellboreProfileZonesResponse: WellboreProfileZonesResponse;

  private totalZones: number = 0;
  private request: WellboreProfileZonesCommand;
  private zoneFlowDataList: ZoneFlowProductionHistoryDataResponse[];
  private zones: string[] = [];
  private zoneX: number[] = [];
  private depth: number[] = [];
  private allDepths: number[] = [];
  private zoneDepth: string[] = [];
  private period: Periodicity;
  private xData: Date[] = [];

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
      this.wsZoneFlowMonitoringService.subscribeUpdates(
        zoneNum,
        this.selectedDepth as DepthType,
        this.period
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
          };
         Plotly.extendTraces('zoneFlowAllocation', update, [data.request.zoneNumber - 1]);           
        }
      ); 
  }

  async getZoneDetailData() {
    this.request = {
      wellId: 'Well Id',
      projectId: 'Project Id',
      depthType: DepthType[this.selectedDepth],
    };
    this.wellboreProfileZonesResponse =
      await this.productionMonitoringService.getWellboreProfileZones(
        this.request
      );
    var zoneInfoData = this.wellboreProfileZonesResponse.zoneInfoData;
    this.totalZones = zoneInfoData.length;
    zoneInfoData.forEach((z , index) => {
      this.depth.push((z.depthTo + z.depthFrom) / 2);
      this.allDepths.push(z.depthFrom);
      if(index == zoneInfoData.length - 1) {
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
    await this.productionMonitoringService
      .getZoneFlowRateDataFromMultipleZones(
        this.totalZones,
        DepthType.MD,
        this.period
      )
      .then((data) => {
        this.zoneFlowDataList = data;
      });

    if (this.zoneFlowDataList) {
      this.plotGraph();
    }
  }

  getShapes() {
    let shapes = [];
    for(let i = 0 ; i < this.totalZones; i++) {
      if (i % 2 == 0) {
       let shapeForChart = {
        type: 'rect', 
        layer: 'below',
        xref: 'x', yref: 'y',
        x0: this.xData[0], x1: this.xData[this.xData.length - 1],
        y0: this.allDepths[i], y1: this.allDepths[i+1],
        opacity: 0.3,
        fillcolor:  'grey',
        line: {
          color: 'grey'
        }
      }
      let shapeForZone = {
        type: 'rect', 
        layer: 'below',
        xref: 'x2', yref: 'y',
        x0: -1, x1: 2,
        y0: this.allDepths[i], y1: this.allDepths[i+1],
        opacity: 0.3,
        fillcolor:  'grey',
        line: {
          color: 'grey'
        }
      }
      shapes.push(shapeForChart);
      shapes.push(shapeForZone);
    }
  }
    return shapes;
  }

  getData() {
    let traces = [];
    if (this.zoneFlowDataList) {
      this.zoneFlowDataList.forEach((zoneFlowData, index) => {
        traces.push(this.getBarChartTrace(zoneFlowData, index + 3));
      });
      traces.push(this.getTraceForZone());
    }
    return traces;
  }

  getLayout() {
    return {
      yaxis: {
        showline: true,
        showgrid: false,
        ticks: 'outside',
        range: [this.allDepths[15], this.allDepths[0]],
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
        domain: [0.05, 1],
      },
      xaxis2: {
        domain: [0, 0.05],
        visible: false,
        autorange: false,
        range: [-0.2, 1.5],
      },
      shapes: this.getShapes(),
      width: 1300,
      paper_bgcolor: 'white',
      plot_bgcolor: 'white',
      showlegend: false,
      hovermode: 'closest',
    };
  }

  plotGraph() {
    const data = this.getData();
    const layout = this.getLayout();

    Plotly.newPlot('zoneFlowAllocation', data, layout);
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
    index: number
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
    this.xData = zoneFlowData.zoneFlowProductionData.map(
      (flow) => new Date(flow.time)
    );
    const traces = {
      x: this.xData,
      y: ydata.map((yval) => yval * 200),
      type: 'bar',
      xaxis: 'x1',
      base: zoneInfo.depthTo ,
      width: 6000,
      customdata: zoneFlowData.zoneFlowProductionData,
      showgrid: true,
      showline: true,
      marker: {
        color: ydata2,
        colorscale: 'Blues',
        showcolorscale: true,
      },
      bargap: 0,
      hovertemplate:
        'Oil: %{customdata.oil:,}<br>' +
        'Water: %{customdata.water:,}<br>' +
        'Gas: %{customdata.gas:,}' +
        '<extra></extra>',
    };
    return traces;
  }

  onChange(newDepth) {
    this.selectedDepth = newDepth;
    this.getZoneDetailData();
  }
}
