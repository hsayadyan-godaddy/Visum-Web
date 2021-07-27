import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js-dist';
import { DepthType } from '../../../enums/depth-type';
import { WellboreProfileZonesCommand } from '../../../models/Request/WellboreProfileZonesCommand';
import { WellboreProfileZonesResponse } from '../../../models/Response/WellboreProfileZonesResponse';
import { ProductionMonitoringService } from '../../../services/productionMonitoring.service';

@Component({
  selector: 'app-zone-chart',
  templateUrl: './zone-chart.component.html',
  styleUrls: ['./zone-chart.component.scss'],
})
export class ZoneChartComponent implements OnInit {
  public wellboreProfileZonesResponse: WellboreProfileZonesResponse;

  public request: WellboreProfileZonesCommand;

  public depthTypes = Object.values(DepthType);

  public selectedDepth: string = 'MD';

  private zones: string[] = [];

  private zoneX: number[] = [];

  private depth: number[] = [];

  private allDepths: number[] = [];

  private zoneDepth: string[] = [];

  private zeroTick: number = 0;

  private ticksize: number = 500;

  private unitOfMeasureLabel: string;

  constructor(public pmService: ProductionMonitoringService) { }

  ngOnInit(): void {
    this.getZoneChartData();
  }

  async getZoneChartData() {
    this.depth = [];
    this.allDepths = [];
    this.zoneX = [];
    this.zones = [];
    this.zoneDepth = [];

    this.request = {
      wellId: 'Well Id',
      projectId: 'Project Id',
      depthType: DepthType[this.selectedDepth],
    };
    await this.pmService.getWellboreProfileZones(this.request).then((data) => {
      this.wellboreProfileZonesResponse = data;
    });
    const { zoneInfoData } = this.wellboreProfileZonesResponse;
    this.unitOfMeasureLabel = this.wellboreProfileZonesResponse.unitOfMeasureInfo.label;
    zoneInfoData.forEach((z) => {
      this.depth.push((z.depthTo + z.depthFrom) / 2);
      this.allDepths.push(z.depthFrom);
      this.allDepths.push(z.depthTo);
      this.zoneX.push(0.5);
      this.zones.push(`Zone ${z.zoneNumber}`);
      this.zoneDepth.push(`From: ${z.depthFrom} To: ${z.depthTo}`);
    });

    const index0: number = 0;
    const index1: number = 1;
    this.zeroTick = this.allDepths[index0];
    this.ticksize = this.allDepths[index1];

    this.createZoneChartGraph();
  }

  createZoneChartData() {
    const trace1 = {
      type: 'scatter',
      x: this.zoneX,
      y: this.depth,
      yaxis: 'y',
      mode: 'text',
      text: this.zones,
      customdata: this.zoneDepth,
      name: '',
      marker: {
        color: 'rgba(156, 165, 196, 0.95)',
        symbol: 'circle',
        size: 10,
        sizeref: 4000,
      },
      hovertemplate: '<b>Zone Range</b><br> %{customdata}',
    };
    const data = [trace1];
    return data;
  }

  createLayout(unitOfMeasureLabel: string) {
    const layout = {
      title: '',
      xaxis: {
        visible: false,
        showticklabels: false,
        fixedrange: true,
      },
      yaxis: {
        showline: true,
        title: `Measured Depth (${unitOfMeasureLabel})`,
        titlefont: { color: '#1f77b4' },
        tickfont: { color: '#1f77b4' },
        ticks: 'outside',
        ticklength: 8,
        tickformat: ',d',
        tick0: this.zeroTick,
        dtick: this.ticksize,
        zeroline: false,
        autorange: 'reversed',
        fixedrange: true,
      },
      paper_bgcolor: 'white',
      plot_bgcolor: 'white',
      showlegend: false,
      hovermode: 'closest',
    };
    return layout;
  }

  onDepthChange(newDepth) {
    this.selectedDepth = newDepth;
    this.getZoneChartData();
  }

  createZoneChartGraph() {
    const data = this.createZoneChartData();
    const layout = this.createLayout(this.unitOfMeasureLabel);

    Plotly.newPlot('zonechart', data, layout, { displayModeBar: false });
  }
}
