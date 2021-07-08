import { Component, OnInit } from '@angular/core';
import { Productionmonitoring } from 'src/app/models/productionmonitoring/productionmonitoring';
import { Well } from 'src/app/models/well';
import { ProductionMonitoringService } from 'src/app/services/productionMonitoring.service';

@Component({
  selector: 'app-well-sellection-with-buttons',
  templateUrl: './well-sellection-with-buttons.component.html',
  styleUrls: ['./well-sellection-with-buttons.component.scss']
})
export class WellSellectionWithButtonsComponent implements OnInit {
  selected = '';
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
    // this._pmService.Compare()
    alert("compare");
  }

  onClickComment(){
    alert("comment");
   //this._pmSService.Comment() alert('Comment');
  }

  onClickDisplay(){
    alert('Display');
  }
}
