import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { DepthType } from 'src/app/enums/depth-type';
import { ZoneFlowTimeOilWaterGas } from 'src/app/models/productionmonitoring/ZoneFlowTimeOilWaterGas';
import { WellboreProfileZonesCommand } from 'src/app/models/Request/WellboreProfileZonesCommand';
import { WellboreProfileZonesResponse } from 'src/app/models/Response/WellboreProfileZonesResponse';
import { ZoneFlowProductionHistoryDataResponse } from 'src/app/models/Response/ZoneFlowProductionHistoryDataResponse';
import { ProductionMonitoringService } from 'src/app/services/productionMonitoring.service';

@Component({
  selector: 'app-zone-flow-allocation-chart',
  templateUrl: './zone-flow-allocation-chart.component.html',
  styleUrls: ['./zone-flow-allocation-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoneFlowAllocationChartComponent implements OnInit {
  public graph: any;

  private generalColorScale: string[][];
  private totalZones: number = 0;
  public wellboreProfileZonesResponse: WellboreProfileZonesResponse;
  private request: WellboreProfileZonesCommand;
  private depthTypes = Object.values(DepthType);
  private selectedDepth: string = 'MD';
  private zones: string[] = [];
  private zoneX: number[] = [];
  private zoneX2: Date[] = [];
  private depth: number[] = [];
  private allDepths: number[] = [];
  private zoneDepth: string[] = [];

  constructor(
    public productionMonitoringService: ProductionMonitoringService,
    private _cd: ChangeDetectorRef
  ) {
    this.generalColorScale = [
      ['0.0', 'rgb(241, 217, 86)'],
      ['0.11111111111', 'rgb(225, 236, 78)'],
      ['0.222222222222', 'rgb(184, 230, 71)'],
      ['0.333333333333', 'rgb(141, 224, 64)'],
      ['0.444444444444', 'rgb(58, 210, 52)'],
      ['0.555555555556', 'rgb(56, 189, 107)'],
      ['0.666666666667', 'rgb(58, 169, 147)'],
      ['0.777777777778', 'rgb(60, 130, 151)'],
      ['0.888888888889', 'rgb(60, 86, 133)'],
      ['1.0', 'rgb(63, 60, 116)'],
    ];
    this.getZoneDetailData();
  }

  ngOnInit(): void {}

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
    zoneInfoData.forEach((z) => {
      this.depth.push((z.depthTo + z.depthFrom) / 2);
      // this.allDepths.push(z.depthFrom);
      // this.allDepths.push(z.depthTo);
      this.zoneX.push(0);
      this.zones.push(`Zone ${z.zoneNumber}`);
      this.zoneDepth.push(`From: ${z.depthFrom} To: ${z.depthTo}`);
    });
    this.getZoneFlowAllocationChartData();
  }

  getZoneFlowAllocationChartData() {
    this.productionMonitoringService
      .getZoneFlowRateDataFromMultipleZones(this.totalZones, DepthType.MD)
      .subscribe(
        (zoneFlowDataList: ZoneFlowProductionHistoryDataResponse[]) => {
          let traces = [];
          let layout = {};
          layout = {
            yaxis: {
              showline: true,
              ticks: 'outside',
              ticklength: 8,
              tick0: this.depth[0],
              dtick: 2500,
              zeroline: false,
              // gridcolor: 'lightgrey',
              // gridwidth: 10,
              autorange: 'reversed',
              anchor: 'free',
              overlaying: 'y',
              position: 1.01
            },
            xaxis: {
              type: 'date',
              autorange: true,
              visible: true,
              domain: [0.056, 1],
              anchor: 'y1',
            },
            xaxis2: {
              domain: [0, 0.05],
              anchor: 'y1',
              visible: false,
            },
            width: 1500,
            // height: 800,
            paper_bgcolor: 'white',
            plot_bgcolor: 'white',
            showlegend: false,
            hovermode: "closest"
          };

          zoneFlowDataList.forEach((zoneFlowData, index) => {
            traces.push(this.getBarTraceForZone(zoneFlowData, index + 3));
          });
          traces.push(this.getTraceForZone());
          this.graph = {
            data: traces,
            layout: layout,
          };
          this._cd.markForCheck();
        }
      );
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
      // marker: {
      //   color: 'rgba(156, 165, 196, 0.95)',
      //   symbol: 'circle',
      //   size: 10,
      //   sizeref: 4000,
      // },
      hovertemplate: '<b>Zone Range</b><br> %{customdata}',
    };
  }

  getBarTraceForZone(
    zoneFlowData: ZoneFlowProductionHistoryDataResponse,
    index: number
  ): {} {
    const zoneInfo = this.wellboreProfileZonesResponse.zoneInfoData.find(
      (z) => z.zoneNumber == zoneFlowData.zoneNumber
    );
    let ydata = zoneFlowData.zoneFlowProductionData.map(
      (flow) => (-flow.oil - flow.water - flow.gas)
    );
    const traces = {
      x: zoneFlowData.zoneFlowProductionData.map((flow) => new Date(flow.time)),
      y: ydata.map((yval) => yval * 1000),
      //  yaxis: 'y' + index,
      type: 'bar',
      xaxis: 'x1',
      base: (zoneInfo.depthTo + zoneInfo.depthFrom) / 2,
      width: 1000000,
      customdata: zoneFlowData.zoneFlowProductionData,
      showgrid: true,
      showline: true,
      marker: {
        color: this.getColorScale(zoneFlowData, 0.2),
      //  colorscale: ,
        //reversescale: true,
        showcolorscale: true
      },
      hovertemplate:
        'Oil: %{customdata.oil:,}<br>' +
        'Water: %{customdata.water:,}<br>' +
        'Gas: %{customdata.gas:,}' +
        '<extra></extra>',
    };
    return traces;
  }

  getColorScale(
    zoneFlowData: ZoneFlowProductionHistoryDataResponse,
    maxLimit: number
  ): string[] {
    const colorScale = zoneFlowData.zoneFlowProductionData.map(
      (zoneFlowData) => {
        return this.getColor(zoneFlowData , 0.2);
      }
    );

    return colorScale;
  }

  getColor(zoneFlowData: ZoneFlowTimeOilWaterGas , maxVal: number): string {
    const oilColor = [0, 255, 0];
    const waterColor = [0, 0, 255];
    const gasColor = [255, 255, 0];
    
    let oil = (zoneFlowData.oil/maxVal) ;
    let water = (zoneFlowData.water/maxVal) 
    let gas = (zoneFlowData.gas/maxVal)
    
    const  blendedColor = [
        (oil  * oilColor[0]) +
          (water * waterColor[0]) +
          (gas * gasColor[0]),
        (oil * oilColor[1] ) +
          (water * waterColor[1]) +
          (gas * gasColor[1]),
        (oil * oilColor[2]) +
          (water * waterColor[2] ) +
          (gas * gasColor[2]),
      ];
    // const blendedColor = [
    //   zoneFlowData.oil * oilColor[0] +
    //     zoneFlowData.water * waterColor[0] +
    //     zoneFlowData.gas * gasColor[0],
    //   zoneFlowData.oil * oilColor[1] +
    //     zoneFlowData.water * waterColor[1] +
    //     zoneFlowData.gas * gasColor[1],
    //   zoneFlowData.oil * oilColor[2] +
    //     zoneFlowData.water * waterColor[2] +
    //     zoneFlowData.gas * gasColor[2],
    // ];

    return (
      'rgb(' +
      blendedColor[0] +
      ',' +
      blendedColor[1] +
      ',' +
      blendedColor[2] +
      ')'
    );
  }
}
