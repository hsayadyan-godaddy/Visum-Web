import { Component, OnInit } from '@angular/core';
import { DepthType } from '../../../enums/depth-type';
import { WellboreProfileZonesCommand } from '../../../models/Request/WellboreProfileZonesCommand';
import { WellboreProfileZonesResponse } from '../../../models/Response/WellboreProfileZonesResponse';
import { ProductionMonitoringService } from '../../../services/productionMonitoring.service';

@Component({
  selector: 'app-zone-chart',
  templateUrl: './zone-chart.component.html',
  styleUrls: ['./zone-chart.component.css']
})
export class ZoneChartComponent implements OnInit {
  public wellboreProfileZonesResponse: WellboreProfileZonesResponse;
  public request : WellboreProfileZonesCommand;
  public depthTypes = Object.values(DepthType);
  public selectedDepth: string = 'MD';
  public zones: string[] = [];
  public zoneX: number[] = [];
  public depth: number[] = [];
  public allDepths: number[] = [];
  public zoneDepth: string[] = [];
  public graph = {
    data : this.createZoneChartData(),
    layout: this.createLayout()
  };
  constructor(public pmService: ProductionMonitoringService) { }
  

  ngOnInit(): void {
    this.getZoneChartData();
    this.createZoneChartData();
  }

  async getZoneChartData() {
    this.request = {
      wellId: 'Well Id',
      projectId: 'Project Id',
      depthType: DepthType[this.selectedDepth]
    };
    this.wellboreProfileZonesResponse = await this.pmService.getWellboreProfileZones(this.request);
    var zoneInfoData = this.wellboreProfileZonesResponse.zoneInfoData;
    zoneInfoData.forEach(z => {
      this.depth.push((z.depthTo + z.depthFrom) / 2);
      this.allDepths.push(z.depthFrom);
      this.allDepths.push(z.depthTo);
      this.zoneX.push(0.5);
      this.zones.push(`Zone ${z.zoneNumber}`);
      this.zoneDepth.push(`From: ${z.depthFrom} To: ${z.depthTo}`);
    })
  };

  createZoneChartData() {
    var trace1 = {
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
        sizeref: 4000
      },
      hovertemplate: '<b>Zone Range</b><br> %{customdata}'
    };
    var data = [trace1];
    return data;
  };

  createLayout() {
    var layout = {
      title: '',
      xaxis: {
        visible: false,
        showticklabels: false
      },
      margin: {
        l: 140,
        r: 40,
        b: 50,
        t: 70
      },
      yaxis: {
        showline: true,
        title: 'Measured Depth',
        titlefont: { color: '#1f77b4' },
        tickfont: { color: '#1f77b4' },
        ticks: 'outside',
        ticklength: 8,
        tick0: this.depth[0],
        dtick: 1000,
        zeroline: false,
        autorange: 'reversed'
      },
      width: 400,
      height: 600,
      paper_bgcolor: 'white',
      plot_bgcolor: 'white',
      showlegend: false,
      hovermode: "closest"
    };

    return layout;
  }

  onChange(newDepth) {
    this.selectedDepth = newDepth;
    this.getZoneChartData();
    this.createZoneChartData();
  }
}