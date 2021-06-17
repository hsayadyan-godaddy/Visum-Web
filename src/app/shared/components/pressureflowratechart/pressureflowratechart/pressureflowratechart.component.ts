import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js-dist';
@Component({
  selector: 'app-pressureflowratechart',
  templateUrl: './pressureflowratechart.component.html',
  styleUrls: ['./pressureflowratechart.component.css']
})
export class PressureflowratechartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

  public graph = {

    data: [

      { x: ['10', '11', '12', '13', '14'], y: [50, 60, 40, 20, 10], legendgroup: 'group1', type: 'scatter', mode: 'lines', name: 'BOTTOM HOLE PRESSURE(5000 FT)', marker: { color: 'yellow' } },
      { x: ['10', '11', '12', '13', '14'], y: [60, 80, 90, 100, 40], legendgroup: 'group1', type: 'scatter', mode: 'lines', name: 'Pressure SENSOR P1(100 FT)', marker: { color: 'green' } },
      { x: ['10', '11', '12', '13', '14'], y: [62, 76, 80, 80, 40], legendgroup: 'group2', type: 'scatter', mode: 'lines', name: 'Pressure SENSOR P2(1000 FT)', marker: { color: 'red' } },
      { x: ['10', '11', '12', '13', '14'], y: [70, 90, 60, 100, 0], legendgroup: 'group2', type: 'scatter', mode: 'lines', name: 'Pressure SENSOR P3(3000 FT)', marker: { color: 'blue' } },
      { x: ['10', '11', '12', '13', '14'], y: [60, 70, 60, 70, 0], legendgroup: 'group3', type: 'scatter', mode: 'lines', name: 'SURFACE FLOW RATE', marker: { color: 'black' }, yaxis: 'y2', line: { dash: 'dash', color: 'black' } },
      { x: ['10', '11', '12', '13', '14'], y: [50, 60, 40, 20, 10], legendgroup: 'group5', visiable: 'legendonly', showlegend: false, type: 'scatter', yaxis: 'y3', marker: { color: 'white' } },
      { x: ['10', '11', '12', '13', '14'], y: [50, 60, 40, 20, 10], legendgroup: 'group5', visiable: 'legendonly', showlegend: false, type: 'scatter', yaxis: 'y4', marker: { color: 'white' } }

    ],
    layout: {

      showlegend: true,
      title: {
        text: 'PRESSURE/FlOWRATE',
        x: 0.24,
        y: 1.35
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
        bgcolor: '#E2E2E2',
        bordercolor: '#FFFFFF',
        borderwidth: 2

      },
      xaxis: {
        title: 'Hours',
        domain: [0.3, 0.99],
        showline: true,
        tickvals: this.calculateScale(10, 14)[0],
        ticktext: this.calculateScale(10, 14)[1],
        ticklen: 5,
        tickwidth: 2,
        tickmode: 'match overlay',
        position: 0.05

      },
      yaxis: {
        range: [0, 100],
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
        range: [0, 100],
        type: 'linear',
        showgrid: false,
        zeroline: false,
        showline: false,
        ticks: 'outside',
        tick0: 0,
        dtick: 2,
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
        range: [0, 100],
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
        range: [0, 100],
        type: 'linear',
        showgrid: false,
        zeroline: false,
        showline: false,
        ticks: 'outside',
        tick0: 0,
        dtick: 2,
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
