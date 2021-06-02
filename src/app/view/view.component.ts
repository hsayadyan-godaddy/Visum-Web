import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label  } from 'ng2-charts';
import { Observable, Subscription , interval } from 'rxjs';
import { SharedService } from '../shared.service';


export interface WellData {
  WellId: string;
  WellName : string ;
  WellType: string;
  ProjectName: string;
  Status: string
}


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})


export class ViewComponent implements OnInit {
private eventSubsciption$ : Subscription;

 dataSource : WellData = {
WellName : '',
ProjectName : '',
Status : '',
WellType : '',
WellId: ''
};  

wellDataList: WellData[]= [];
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Pressure' },
    { data: [], label: 'Temperature' },
    //{ data: [36, 65, 78, 78, 78, 58, 66], label: 'Well C' },
  ];
  public lineChartLabels: Label[] = [];//['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  
  
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
       ticks: {
         autoSkip: false,
         maxTicksLimit: 10
       }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation : {},
  };


  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(
    private sharedService: SharedService,
    private actRoute : ActivatedRoute
  ) { }

  ngOnInit()  {
 this.getWellData();
 var pid = this.actRoute.snapshot.paramMap.get('id');
 interval(5000).subscribe(sub => {
     this.sharedService.getDataByWellId(pid).subscribe(data =>
    {
        console.log(data);
        this.pushEventToChartData(data);
        this.wellDataList.push(data);
      });
    });
     
  }
  pushEventToChartData(event: any) : void {
    this.lineChartData[0].data.push(event.Pressure);
    //this.lineChartData[0].label = "Pressure";
    this.lineChartData[1].data.push(event.Temperature);
    //this.lineChartData[1].label = "Temperature";
    this.lineChartLabels.push(this.getLabel(event.DateTime))
  }
  
  getLabel(event: any): string {
    return `${event}`;
  };

  getWellData(){
    this.dataSource.WellName = '';
    var pid = this.actRoute.snapshot.paramMap.get('id');
    this.sharedService.getWellById(pid).subscribe((data:WellData)=>{
      console.log(data);
      this.dataSource = data;
    })
  }
  
}