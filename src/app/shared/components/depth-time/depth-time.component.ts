import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { DepthType } from '../../../enums/depth-type';
import { ProductionMonitoringService } from '../../../services/productionMonitoring.service';
import { Periodicity } from '../../../enums/periodicity';
import { Options, LabelType } from 'ng5-slider'

@Component({
  selector: 'app-depth-time',
  templateUrl: './depth-time.component.html',
  styleUrls: ['./depth-time.component.scss']
})
export class DepthTimeComponent implements OnInit {
  depthType: DepthType;
  data: Object;

  constructor(private httpClient: ProductionMonitoringService) { }

  ngOnInit(): void {
  }
  
  onClickBtn(name: string) {
    let period;
    switch (name) {
      case '24H':
        period = Periodicity.Hours24;
        break;
      case '7D':
        period = Periodicity.Days7;
        break;
      case '30D':
        period = Periodicity.Days30;
        break;
      case '60D':
        period = Periodicity.Days60;
        break;
      case '90D':
        period = Periodicity.Days90;
        break;
      case '1Y':
        period = Periodicity.OneYear;
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
  public currentDate = new Date();
  dateRange: Date[] = this.createDateRange();
  value: number = this.dateRange[0].getTime();
  highValue: Date = this.currentDate;

  options: Options = {
    showTicks: true,
    stepsArray: this.dateRange.map((date: Date) => {
      return { value: date.getTime() };
    }),
    translate: (value: number, label: LabelType): string => {
      return new Date(value).toDateString();
    }
  };

  createDateRange(): Date[] {
    const dates: Date[] = [];
    for (let i: number = 1; i <= 31; i++) {
      dates.push(new Date(2018, 5, i));
    }
    return dates;
  }

}
