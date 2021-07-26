import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js-dist';
import { Subscription } from 'rxjs';
import { TimeRange } from '../../../models/production-monitoring/time-range';
import { Periodicity } from '../../../enums/periodicity';
import { FlowRateHistoryDataCommand } from '../../../models/Request/FlowRateHistoryDataCommand';
import { FlowRateSensorsCommand } from '../../../models/Request/FlowRateSensorsCommand';
import { PressureHistoryDataCommand } from '../../../models/Request/PressureHistoryDataCommand';
import { PressureSensorsCommand } from '../../../models/Request/PressureSensorsCommand';
import { FlowRateHistoryDataResponse } from '../../../models/Response/FlowRateHistoryDataResponse';
import { FlowRateSensorsResponse } from '../../../models/Response/FlowRateSensorsResponse';
import { PressureHistoryDataResponse } from '../../../models/Response/PressureHistoryDataResponse';
import { PressureSensorsResponse } from '../../../models/Response/PressureSensorsResponse';
import { PressureDataUpdatesRequestParameters } from '../../../models/websocket/ws-request-parameters/pressure-data-updates-request-parameters';
import { ProductionMonitoringService } from '../../../services/productionMonitoring.service'; 
import { WsPressureMoniteringService } from '../../../services/ws-production-monitoring/ws-pressure-monitoring.service';
@Component({
  selector: 'app-pressureflowratechart',
  templateUrl: './pressureflowratechart.component.html',
  styleUrls: ['./pressureflowratechart.component.scss']
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
  private params: PressureDataUpdatesRequestParameters;
  timeRange: TimeRange;
  flowSub: Subscription;
  private period: Periodicity;
  constructor(private productionMonitoringService: ProductionMonitoringService, private wsPressureService: WsPressureMoniteringService) { }

  ngOnInit(): void {

    this.getFlowRateSensors();
    this.getPressureSensors();

    this.productionMonitoringService.periodicity.subscribe(value => {

      this.period = value
      this.plotRefresh(this.period);

    });
    this.productionMonitoringService.timeRange.subscribe(value => {
      this.timeRange = value
      this.period = null
      if(this.timeRange !=null){
        this.plotRefresh(this.period,this.timeRange);
      }
      
    });
    this.subscribeUpdates();
    this.getSubscribedData();
  }

  
  subscribeUpdates() {

    this.params = {
      sensorId: 'Bottom-Hole-Pressure-5000',
      projectId: 'project1',
      wellId: 'well1'
    };

    this.wsPressureService.subscribeUpdates(this.params);

    this.params = {
      sensorId: 'Pressure-P1-100',
      projectId: 'project1',
      wellId: 'well1'
    };
    this.wsPressureService.subscribeUpdates(this.params);
    this.params = {
      sensorId: 'Pressure-P2-1000',
      projectId: 'project1',
      wellId: 'well1'
    };
    this.wsPressureService.subscribeUpdates(this.params);
    this.params = {
      sensorId: 'Pressure-P3-3000',
      projectId: 'project1',
      wellId: 'well1'
    };
    this.wsPressureService.subscribeUpdates(this.params);
    this.params = {
      sensorId: 'Flow-Rate-Surface',
      projectId: 'project1',
      wellId: 'well1'
    };
    this.wsPressureService.subscribeUpdates(this.params);
  }

  getSubscribedData() {

    var update;

    this.wsPressureService.onNewTimeValueResponse.subscribe(data => {

      if (data.params.sensorId == 'Bottom-Hole-Pressure-5000') {

        update = {
          x: [[data.value.time]],
          y: [[data.value.value]]
        }
        if (this.xBHPArray.length > 0) {
          Plotly.extendTraces('graph', update, [0])
        }


      }
      else if (data.params.sensorId == 'Pressure-P1-100') {
        update = {
          x: [[data.value.time]],
          y: [[data.value.value]]
        }
        if (this.xP1Array.length > 0) {
          Plotly.extendTraces('graph', update, [1])
        }

      }

      else if (data.params.sensorId == 'Pressure-P2-1000') {
        update = {
          x: [[data.value.time]],
          y: [[data.value.value]]
        }
        if (this.xP2Array.length > 0) {
          Plotly.extendTraces('graph', update, [2])
        }

      }
      else if (data.params.sensorId == 'Pressure-P3-3000') {
        update = {
          x: [[data.value.time]],
          y: [[data.value.value]]
        }
        if (this.xP3Array.length > 0) {
          Plotly.extendTraces('graph', update, [3])
        }

      }
      else if (data.params.sensorId == 'Flow-Rate-Surface') {
        update = {
          x: [[data.value.time]],
          y: [[data.value.value]]
        }
        if (this.xArray.length > 0) {
          Plotly.extendTraces('graph', update, [4])
        }

      }
    });
  }

  plotRefresh(period: Periodicity,timeRange?:TimeRange) {
    this.getPressureHistoryData(period,timeRange);

  }

  async getFlowRateSensors() {
    this.flowRateSensorCmd = {
      projectId: 'project1',
      wellId: 'well1'
    }

    this.flowRateSensorResponse = await this.productionMonitoringService.getFlowRateSensorsAsync(this.flowRateSensorCmd);

  }

  async getPressureSensors() {
    this.pressureSensorsCommand = {
      projectId: 'project1',
      wellId: 'well1'
    }

    this.pressureSensorsResponse = await this.productionMonitoringService.getPressureSensorsAsync(this.pressureSensorsCommand);

  }

  async getPressureHistoryData(period: Periodicity,timeRange?:TimeRange) {
    if(timeRange !=null){
      this.pressureHistoryDataCommand = {
        sensorId: 'Bottom-Hole-Pressure-5000',
        periodicity: timeRange.periodicity,
        snapshotSize: 100,
        projectId: 'project1',
        wellId: 'well1',
        fromDate:timeRange.fromDate,
        toDate:timeRange.toDate
      }
    }

    if(period!=null){
      this.pressureHistoryDataCommand = {
        sensorId: 'Bottom-Hole-Pressure-5000',
        periodicity: period,
        snapshotSize: 100,
        projectId: 'project1',
        wellId: 'well1'
      }
    }
    this.bhppressureHistoryDataResponse = await this.productionMonitoringService.getPressureHistoryDataAsync(this.pressureHistoryDataCommand);

    if (this.bhppressureHistoryDataResponse.pressureData) {
      this.xBHPArray = [];
      this.yBHPArray = [];

      this.bhppressureHistoryDataResponse.pressureData.data.forEach(v => {

        this.xBHPArray.push(new Date(v.time));
        this.yBHPArray.push(v.value);

      });

    }



    if(timeRange!=null){
      this.pressureHistoryDataCommand = {
        sensorId: 'Pressure-P1-100',
        periodicity: timeRange.periodicity,
        snapshotSize: 100,
        projectId: 'project1',
        wellId: 'well1',
        fromDate:timeRange.fromDate,
        toDate:timeRange.toDate
      }
    }
    if(period!=null){
      this.pressureHistoryDataCommand = {
        sensorId: 'Pressure-P1-100',
        periodicity: period,
        snapshotSize: 100,
        projectId: 'project1',
        wellId: 'well1'
      }
    }
    this.p1pressureHistoryDataResponse = await this.productionMonitoringService.getPressureHistoryDataAsync(this.pressureHistoryDataCommand);

    if (this.p1pressureHistoryDataResponse.pressureData) {
      this.xP1Array = [];
      this.yP1Array = [];

      this.p1pressureHistoryDataResponse.pressureData.data.forEach(v => {
        this.xP1Array.push(new Date(v.time));
        this.yP1Array.push(v.value);
      });

    }


    if(timeRange!=null){
      this.pressureHistoryDataCommand = {
        sensorId: 'Pressure-P2-1000',
        periodicity: timeRange.periodicity,
        snapshotSize: 100,
        projectId: 'project1',
        wellId: 'well1',
        fromDate:timeRange.fromDate,
        toDate:timeRange.toDate
      }
    }
    if(period!=null){
      this.pressureHistoryDataCommand = {
        sensorId: 'Pressure-P2-1000',
        periodicity: period,
        snapshotSize: 100,
        projectId: 'project1',
        wellId: 'well1'
      }
    }
    this.p2pressureHistoryDataResponse = await this.productionMonitoringService.getPressureHistoryDataAsync(this.pressureHistoryDataCommand);

    if (this.p2pressureHistoryDataResponse.pressureData) {
      this.xP2Array = [];
      this.yP2Array = [];

      this.p2pressureHistoryDataResponse.pressureData.data.forEach(v => {
        this.xP2Array.push(new Date(v.time));
        this.yP2Array.push(v.value);
      });

    }

    if(timeRange!=null){
      this.pressureHistoryDataCommand = {
        sensorId: 'Pressure-P3-3000',
        periodicity: timeRange.periodicity,
        snapshotSize: 100,
        projectId: 'project1',
        wellId: 'well1',
        fromDate:timeRange.fromDate,
        toDate:timeRange.toDate
      }  
    }
    if(period!=null){
      this.pressureHistoryDataCommand = {
        sensorId: 'Pressure-P3-3000',
        periodicity: period,
        snapshotSize: 100,
        projectId: 'project1',
        wellId: 'well1'
      }
    }
    this.p3pressureHistoryDataResponse = await this.productionMonitoringService.getPressureHistoryDataAsync(this.pressureHistoryDataCommand);

    if (this.p3pressureHistoryDataResponse.pressureData) {
      this.xP3Array = [];
      this.yP3Array = [];

      this.p3pressureHistoryDataResponse.pressureData.data.forEach(v => {

        this.xP3Array.push(new Date(v.time));
        this.yP3Array.push(v.value);

      });
      this.getFlowRateHistoryData(period,timeRange);
    }

  }

  async getFlowRateHistoryData(period: Periodicity,timeRange?:TimeRange) {

    if(timeRange!=null){
      this.flowRateHistoryDataCommand = {
        sensorId: 'Flow-Rate-Surface',
        periodicity: timeRange.periodicity,
        projectId: 'project1',
        wellId: 'well1',
        snapshotSize: 100,
        fromDate:timeRange.fromDate,
        toDate:timeRange.toDate
      }
    }
    if(period!=null){
      this.flowRateHistoryDataCommand = {
        sensorId: 'Flow-Rate-Surface',
        periodicity: period,
        projectId: 'project1',
        wellId: 'well1',
        snapshotSize: 100
      }
    }

    this.flowRateHistoryDataResponse = await this.productionMonitoringService.getFlowRateHistoryDataAsync(this.flowRateHistoryDataCommand);

    if (this.flowRateHistoryDataResponse.flowRateData) {

      this.xArray = [];
      this.yArray = [];

      this.flowRateHistoryDataResponse.flowRateData.data.forEach(v => {

        this.xArray.push(new Date(v.time));
        this.yArray.push(v.value);
        this.yMinorArray.push(Math.random());

      });

    }
    if (this.flowRateHistoryDataResponse.flowRateData && 
      this.bhppressureHistoryDataResponse.pressureData && 
      this.p1pressureHistoryDataResponse.pressureData  && 
      this.p2pressureHistoryDataResponse.pressureData && 
      this.p3pressureHistoryDataResponse.pressureData) {

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


  plotGraph() {

    const data = this.getData();
    const layout = {

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
        ticklen: 5,
        tickwidth: 2,
      },
      yaxis: {

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
        type: 'linear',
        showgrid: false,
        zeroline: false,
        showline: false,
        ticks: 'outside',
        tick0: 0,
        dtick: 0.03,
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
        type: 'linear',
        showgrid: false,
        zeroline: false,
        showline: false,
        ticks: 'outside',
        tick0: 0,
        dtick: 0.03,
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

    Plotly.newPlot('graph', data, layout);


  }


}
