import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label  } from 'ng2-charts';
import { Subscription } from 'rxjs';
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


  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Weel  A' },
    { data: [40, 50, 85, 75, 67, 40, 35], label: 'Well B' },
    { data: [36, 65, 78, 78, 78, 58, 66], label: 'Well C' },
  ];
  public lineChartLabels: Label[] = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  
  
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
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
    this.eventSubsciption$ = this.sharedService.getServerSentEvent(pid).subscribe(event =>
    {
        let data = JSON.parse(event.data);
        console.log(data);
        this.pushEventToChartData(data);
      });
      
     
  }
  pushEventToChartData(event: any) : void {
    this.lineChartData[0].data.push(event.data);
    this.lineChartLabels.push(this.getLabel(event))
  }
  
  getLabel(event: any): string {
    return `${event.window}`;
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