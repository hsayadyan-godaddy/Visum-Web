import { Component, OnInit } from '@angular/core';
import { Productionmonitoring } from 'src/app/models/productionmonitoring/productionmonitoring';
import { Well } from 'src/app/models/well';
import { ProductionMonitoringService } from 'src/app/services/productionMonitoring.service';

@Component({
  selector: 'app-well-sellection-with-buttons',
  templateUrl: './well-sellection-with-buttons.component.html',
  styleUrls: ['./well-sellection-with-buttons.component.css']
})
export class WellSellectionWithButtonsComponent implements OnInit {
  selected = 'Well1';
  wells : Well[];
  pmData : Productionmonitoring;

  constructor(
    private _pmService: ProductionMonitoringService
    ) { }

  getWells() : void
  {
    this._pmService.getWells().subscribe((data: Well[])=>{
      this.wells = data;
    });
  }

  ngOnInit(): void {
  }



  onClickCompare(){
    alert('Compare');
  }

  onClickComment(){
    alert('Comment');
  }

  onClickDisplay(){
    alert('Display');
  }
}
