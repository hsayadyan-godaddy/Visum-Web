import { Component } from '@angular/core';

@Component({
  selector: 'app-timecharts',
  templateUrl: './timecharts.component.html',
  styleUrls: ['./timecharts.component.css'],
})
export class TimechartsComponent {
  public graph = {
    data: [
      {
        x: ['2015-02-17', '2015-02-19', '2015-07-19', '2015-06-17'], y: [6.78, 7.98, 4.67, 7.77], type: 'scatter', mode: 'lines', name: 'Pressure', marker: { color: 'red' },
      },
      {
        x: ['2015-02-17', '2015-02-19', '2015-07-19', '2015-06-17'], y: [62, 76, 80, 80], type: 'scatter', mode: 'lines', name: 'Temperature', marker: { color: 'blue' },
      },
    ],
    layout: {
      width: 1000,
      height: 500,
      title: 'TEST Plot',
      xaxis: {

        ticks: 'outside',
        autorange: true,
        range: ['2015-02-17', '2017-02-16'],
        rangeselector: {
          buttons: [
            {
              count: 1,
              label: '1m',
              step: 'month',
              stepmode: 'backward',
            },
            {
              count: 6,
              label: '6m',
              step: 'month',
              stepmode: 'backward',
            },
            { step: 'all' },
          ],
        },
        rangeslider: { range: ['2015-02-17', '2017-02-16'] },
        type: 'date',
      },
      yaxis: {
        ticks: 'outside',
        autorange: true,
        range: [86.8700008333, 138.870004167],
        type: 'linear',
      },
    },
  };
}
