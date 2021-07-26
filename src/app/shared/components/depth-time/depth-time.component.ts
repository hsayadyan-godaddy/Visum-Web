import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { DepthType } from '../../../enums/depth-type';
import { ProductionMonitoringService } from '../../../services/productionMonitoring.service';
import { Periodicity } from '../../../enums/periodicity';
import {ProductionMonitoringConstants} from '../../../models/constants/production-monitoring';
import {TimeRange} from '../../../models/production-monitoring/time-range';
import { Options, LabelType } from 'ng5-slider'
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _moment from 'moment';
@Component({
  selector: 'app-depth-time',
  templateUrl: './depth-time.component.html',
  styleUrls: ['./depth-time.component.scss']
})
export class DepthTimeComponent implements OnInit {
  params:TimeRange;
  depthType: DepthType;
  data: Object;
  date: Date = new Date();
  yearsArray:Array<number>=[];
  startDate: Date = new Date(this.date.setHours(this.date.getHours() - 24));
  endDate: Date = new Date();
 
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public currentDate = new Date();
  constructor(private httpClient: ProductionMonitoringService) { }
  @ViewChild('widgetsContent') private widgetsContent: ElementRef;

  
  ngOnInit(): void {
  }
  
  scrollLeft(){
      this.widgetsContent.nativeElement.scrollLeft -= 1300;
 }
 scrollRight(){
        this.widgetsContent.nativeElement.scrollLeft += 1300;
  }
  onClickBtn(name: string) {
    let period;
    switch (name) {
      case '24H':
        period = Periodicity.Hours24;
        this.currentDate = new Date();
        this.endDate = new Date();
        this.startDate = new Date(this.currentDate.setHours(this.currentDate.getHours() - 24));
        break;
      case '7D':
        period = Periodicity.Days7;
        this.currentDate = new Date();
        this.endDate = new Date();
        this.startDate = new Date(this.currentDate.setDate(this.currentDate.getDate() - 7));
        break;
      case '30D':
        period = Periodicity.Days30;
        this.currentDate = new Date();
        this.endDate = new Date();
        this.startDate = new Date(this.currentDate.setDate(this.currentDate.getDate() - 30));
        break;
      case '60D':
        period = Periodicity.Days60;
        this.currentDate = new Date();
        this.endDate = new Date();
        this.startDate = new Date(this.currentDate.setDate(this.currentDate.getDate() - 60));
        break;
      case '90D':
        period = Periodicity.Days90;
        this.currentDate = new Date();
        this.endDate = new Date();
        this.startDate = new Date(this.currentDate.setDate(this.currentDate.getDate() - 90));
        break;
      case '1Y':
        period = Periodicity.OneYear;
        this.currentDate = new Date();
        this.endDate = new Date();
        this.startDate = new Date(this.currentDate.setFullYear(this.currentDate.getFullYear() - 1));
        break;
      case 'All':
        period = Periodicity.All;
        break;
      default:
        break;
    }

    this.httpClient.periodicity.next(period);
  }
  
  // onclick eye button range slider hide show function 
  rangeSlider: boolean = false;
  isMenuOpen = true;
  showRangeSlider(){
    this.rangeSlider = !this.rangeSlider;
    this.isMenuOpen = !this.isMenuOpen;
  }

  // ng5 slider date range code
 
  dateRange: Date[] = this.createDateRange();
  value: Date = this.startDate;
  highValue: Date = this.endDate;

  options: Options = {
    showTicks: true,
    stepsArray: this.dateRange.map((date: Date) => {
      return { value: date.getTime() };
    }),
    translate: (value: number, label: LabelType): string => {
      return new Date(value).toDateString();
    },
    draggableRange: true
  };

  createDateRange(): Date[] {
    const dates: Date[] = [];

    var dt = new Date();
    var currentYear = dt.getFullYear();
    for (let year: number = parseInt(ProductionMonitoringConstants.sliderStartYear); 
          year <= dt.getFullYear(); year++) {
      
      if(year===currentYear){
        for (let month = 1; month <= dt.getMonth(); month++) {
          var daysInMonth = new Date(year, month, 0).getDate();
          for (let days = 1; days <= daysInMonth; days++) {
            dates.push((new Date(year, month, days)));
          }
        }
      }
      else{
        for (let month = 1; month <= 12; month++) {
          var daysInMonth = new Date(year, month, 0).getDate();
          for (let days = 1; days <= daysInMonth + 1; days++) {
            dates.push((new Date(year, month, days)));
          }
        }
      }
      
    }
    return dates;
  }

  sliderChangeEnd() {
     
    this.params = {
      periodicity : Periodicity.FromRange,
      fromDate:new Date(this.startDate).getTime(),
      toDate:new Date(this.endDate).getTime()
    }

    this.httpClient.timeRange.next(this.params);
  }

  startDateChanged(type: string, event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
    this.params = {
      periodicity : Periodicity.FromRange,
      fromDate:new Date(this.startDate).getTime(),
      toDate:new Date(this.endDate).getTime()
    }

    this.httpClient.timeRange.next(this.params);
  }

  endDateChanged(type: string, event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value;
    this.params = {
      periodicity : Periodicity.FromRange,
      fromDate:new Date(this.startDate).getTime(),
      toDate:new Date(this.endDate).getTime()
    }

    this.httpClient.timeRange.next(this.params);
  }


}
