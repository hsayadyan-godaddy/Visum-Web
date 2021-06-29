import { formatDate } from '@angular/common';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js-dist';
import { Subscription } from 'rxjs';
import { Periodicity } from 'src/app/enums/periodicity';
import { FlowRateHistoryDataCommand } from 'src/app/models/Request/FlowRateHistoryDataCommand';
import { FlowRateSensorsCommand } from 'src/app/models/Request/FlowRateSensorsCommand';
import { PressureHistoryDataCommand } from 'src/app/models/Request/PressureHistoryDataCommand';
import { PressureSensorsCommand } from 'src/app/models/Request/PressureSensorsCommand';
import { FlowRateHistoryDataResponse } from 'src/app/models/Response/FlowRateHistoryDataResponse';
import { FlowRateSensorsResponse } from 'src/app/models/Response/FlowRateSensorsResponse';
import { PressureHistoryDataResponse } from 'src/app/models/Response/PressureHistoryDataResponse';
import { PressureSensorsResponse } from 'src/app/models/Response/PressureSensorsResponse';
import { ProductionMonitoringService } from 'src/app/services/productionMonitoring.service';
@Component({
  selector: 'app-pressureflowratechart',
  templateUrl: './pressureflowratechart.component.html',
  styleUrls: ['./pressureflowratechart.component.css']
})
export class PressureflowratechartComponent implements OnInit {
  public graph: any;
  flowRateSensorCmd: FlowRateSensorsCommand;
  public flowRateSensorResponse: FlowRateSensorsResponse;
  public pressureSensorsCommand: PressureSensorsCommand;
  public pressureSensorsResponse: PressureSensorsResponse;
  private flowRateHistoryDataCommand: FlowRateHistoryDataCommand;
  private flowRateHistoryDataResponse: FlowRateHistoryDataResponse;
  private pressureHistoryDataCommand: PressureHistoryDataCommand;
  private bhppressureHistoryDataResponse: PressureHistoryDataResponse;
  private p1pressureHistoryDataResponse: PressureHistoryDataResponse;
  private p2pressureHistoryDataResponse: PressureHistoryDataResponse;
  private p3pressureHistoryDataResponse: PressureHistoryDataResponse;

  private xArray: Array<Date> = [];
  private yArray: Array<number> = [];
  private xBHPArray: Array<Date> = [];
  private yBHPArray: Array<number> = [];
  private xP1Array: Array<Date> = [];
  private yP1Array: Array<number> = [];
  private xP2Array: Array<Date> = [];
  private yP2Array: Array<number> = [];
  private xP3Array: Array<Date> = [];
  private yP3Array: Array<number> = [];
  private yMinorArray: Array<number> = [];

  flowSub: Subscription;
  private period: Periodicity;
  constructor(private _pmService: ProductionMonitoringService) { }

  ngOnInit(): void {
    this.getFlowRateSensors();
    this.getPressureSensors();
    // this.plotGraph();

    this._pmService.periodicityValue.subscribe(value => {
      
      switch (value) {
        case '24H':
          this.period = Periodicity.Hours24;
          break;
        case '7D':
          this.period = Periodicity.Days7;
          break;
        case '30D':
          this.period = Periodicity.Days30;
          break;
        case '60D':
          this.period = Periodicity.Days60;
          break;
        case '90D':
          this.period = Periodicity.Days90;
          break;
        case '1Y':
          this.period = Periodicity.OneYear;
          break;
        case 'All':
          this.period = Periodicity.All;
          break;
        default:
          break;
      }
      

      this.plotRefresh(this.period);
      
    });

  }

  plotRefresh(period: Periodicity) {
    this.getPressureHistoryData(period);
    //this.getFlowRateHistoryData(period);
  }

  async getFlowRateSensors() {
    
    this.flowRateSensorCmd = {
      projectId: 'project1',
      wellId: 'well1'
    }

    this.flowRateSensorResponse = await this._pmService.getFlowRateSensorsAsync(this.flowRateSensorCmd);

  }

  async getPressureSensors() {
    this.pressureSensorsCommand = {
      projectId: 'project1',
      wellId: 'well1'
    }

    this.pressureSensorsResponse = await this._pmService.getPressureSensorsAsync(this.pressureSensorsCommand);

  }

  async getPressureHistoryData(period: Periodicity) {
    this.pressureHistoryDataCommand = {
      sensorId: 'Bottom-Hole-Pressure-5000',
      periodicity: period,
      snapshotSize: 100,
      projectId: 'project1',
      wellId: 'well1'
    }
    this.bhppressureHistoryDataResponse = await this._pmService.getPressureHistoryDataAsync(this.pressureHistoryDataCommand);

    if (this.bhppressureHistoryDataResponse.pressureData) {
      this.xBHPArray = [];
      this.yBHPArray = [];
      
      this.bhppressureHistoryDataResponse.pressureData.data.forEach(v => {

        this.xBHPArray.push(new Date(v.time));
        this.yBHPArray.push(v.value);

      });

    }
    


    this.pressureHistoryDataCommand = {
      sensorId: 'Pressure-P1-100',
      periodicity: period,
      snapshotSize: 100,
      projectId: 'project1',
      wellId: 'well1'
    }
    this.p1pressureHistoryDataResponse = await this._pmService.getPressureHistoryDataAsync(this.pressureHistoryDataCommand);

    if (this.p1pressureHistoryDataResponse.pressureData) {
      this.xP1Array = [];
      this.yP1Array = [];
      
      this.p1pressureHistoryDataResponse.pressureData.data.forEach(v => {
        this.xP1Array.push(new Date(v.time));
        this.yP1Array.push(v.value);
      });

    }
    

    this.pressureHistoryDataCommand = {
      sensorId: 'Pressure-P2-1000',
      periodicity: period,
      snapshotSize: 100,
      projectId: 'project1',
      wellId: 'well1'
    }
    this.p2pressureHistoryDataResponse = await this._pmService.getPressureHistoryDataAsync(this.pressureHistoryDataCommand);

    if (this.p2pressureHistoryDataResponse.pressureData) {
      this.xP2Array = [];
      this.yP2Array = [];
      
      this.p2pressureHistoryDataResponse.pressureData.data.forEach(v => {
        this.xP2Array.push(new Date(v.time));
        this.yP2Array.push(v.value);
      });

    }
    
    this.pressureHistoryDataCommand = {
      sensorId: 'Pressure-P3-3000',
      periodicity: period,
      snapshotSize: 100,
      projectId: 'project1',
      wellId: 'well1'
    }
    this.p3pressureHistoryDataResponse = await this._pmService.getPressureHistoryDataAsync(this.pressureHistoryDataCommand);

    if (this.p3pressureHistoryDataResponse.pressureData) {
      this.xP3Array = [];
      this.yP3Array = [];
      
      this.p3pressureHistoryDataResponse.pressureData.data.forEach(v => {
        
        this.xP3Array.push(new Date(v.time));
        this.yP3Array.push(v.value);
        
      });
      this.getFlowRateHistoryData(period);
    }
    



  }

  async getFlowRateHistoryData(period: Periodicity) {

    this.flowRateHistoryDataCommand = {
      sensorId: 'Flow-Rate-Surfasce',
      periodicity: period,
      projectId: 'project1',
      wellId: 'well1',
      snapshotSize: 100
    }

    this.flowRateHistoryDataResponse = await this._pmService.getFlowRateHistoryDataAsync(this.flowRateHistoryDataCommand);

    if (this.flowRateHistoryDataResponse.flowRateData) {
      var n = 0;
      this.xArray = [];
      this.yArray = [];
      
      this.flowRateHistoryDataResponse.flowRateData.data.forEach(v => {
        
        this.xArray.push(new Date(v.time));
        this.yArray.push(v.value);
        this.yMinorArray.push(n);
        n++;
      });

    }
    if (this.flowRateHistoryDataResponse.flowRateData && this.bhppressureHistoryDataResponse.pressureData && this.p1pressureHistoryDataResponse.pressureData
      && this.p2pressureHistoryDataResponse.pressureData && this.p3pressureHistoryDataResponse.pressureData) {
      this.plotGraph();
    }



  }

  getData() {
    return [

      { x: this.xBHPArray, y: this.yBHPArray, legendgroup: 'group1', type: 'scatter', mode: 'lines', name: this.pressureSensorsResponse.info[0].name, marker: { color: 'yellow' } },
      { x: this.xP1Array, y: this.yP1Array, legendgroup: 'group1', type: 'scatter', mode: 'lines', name: this.pressureSensorsResponse.info[1].name, marker: { color: 'green' } },
      { x: this.xP2Array, y: this.yP2Array, legendgroup: 'group2', type: 'scatter', mode: 'lines', name: this.pressureSensorsResponse.info[2].name, marker: { color: 'red' } },
      { x: this.xP3Array, y: this.yP3Array, legendgroup: 'group2', type: 'scatter', mode: 'lines', name: this.pressureSensorsResponse.info[3].name, marker: { color: 'blue' } },
      { x: this.xArray, y: this.yArray, legendgroup: 'group3', type: 'scatter', mode: 'lines', name: this.flowRateSensorResponse.info[0].name, marker: { color: 'black' }, yaxis: 'y2', line: { dash: 'dash', color: 'black' } },
      { x: this.xBHPArray, y: this.yMinorArray, legendgroup: 'group5', visiable: 'legendonly', showlegend: false, type: 'scatter', yaxis: 'y3', marker: { color: 'white' } },
      { x: this.xArray, y: this.yMinorArray, legendgroup: 'group5', visiable: 'legendonly', showlegend: false, type: 'scatter', yaxis: 'y4', marker: { color: 'white' } }

    ]
  }
  calculateScale(min, max) {
    let arr = [], textArr = [];
    for (let i = (min * 10); i <= (max * 10); i++) {
      arr.push((i / 10).toString());
      if ((i % 10) == 0) {
        textArr.push((i / 10).toString());
      } else {
        textArr.push('');
      }
    }
    return [arr, textArr];
  }

  plotGraph() {
    

    this.graph = {

      data: this.getData(),
      layout: {

        showlegend: true,
        title: {
          text: 'PRESSURE/FlOWRATE',
          x: 0.24,
          y: 1.20
        },
        legend: {
          orientation: 'h',
          x: 0.39,
          y: 1.30,
          xanchor: 'left',
          font: {
            family: 'sans-serif',
            size: 12,
            color: '#000'
          },


        },
        xaxis: {
          type: 'date',
          autorange: true,
          title: 'Hours',
          domain: [0.3, 0.99],
          showline: true,
          //tickvals: this.calculateScale(10, 14)[0],
          //ticktext: this.calculateScale(10, 14)[1],
          ticklen: 5,
          tickwidth: 2,
          //tickmode: 'match overlay',
          //position: 0.05

        },
        yaxis: {
          //range: [0, 100],
          title: {
            text: 'Pressure (PSI)'

          },
          titlefont: {
            color: 'red'
          },
          autorange: true,

          type: 'linear',

          showgrid: false,
          zeroline: true,
          showline: true,
          autotick: true,
          ticks: 'outside',
          tick0: 0,
          ticklen: 8,
          tickwidth: 1,
          tickcolor: '#000',
          linecolor: '#636363',
          linewidth: 1,
          tickfont: {
            color: 'red'
          }

        },
        yaxis3: {
          //range: [0, 100],
          type: 'linear',
          showgrid: false,
          zeroline: false,
          showline: false,
          ticks: 'outside',
          tick0: 0,
          dtick: this.yBHPArray.length / 100,
          ticklen: 4,
          tickwidth: 0.3,
          tickcolor: '#000',
          showticklabels: false,
          overlaying: 'y',
          side: 'left',
          anchor: 'free',
          position: 0.30,
        },
        yaxis2: {
          //range: [0, 100],
          title: {
            text: 'Flow Rate (bpm)',

          },
          autorange: true,
          type: 'linear',
          showgrid: false,
          zeroline: true,
          showline: true,
          ticks: 'outside',
          tick0: 0,
          ticklen: 8,
          tickwidth: 1,
          tickcolor: '#000',
          showticklabels: true,
          overlaying: 'y',
          side: 'left',
          anchor: 'free',
          position: 0.24,

        },
        yaxis4: {
          //range: [0, 100],
          type: 'linear',
          showgrid: false,
          zeroline: false,
          showline: false,
          ticks: 'outside',
          tick0: 0,
          dtick: this.xArray.length / 100,
          ticklen: 4,
          tickwidth: 0.3,
          tickcolor: '#000',
          showticklabels: false,
          overlaying: 'y',
          side: 'left',
          anchor: 'free',
          position: 0.24,
        }
      }

    };
  }


}
