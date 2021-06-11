import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Productionmonitoring } from 'src/app/models/productionmonitoring/productionmonitoring';
import { Well } from 'src/app/models/well';
import { ProductionMonitoringService } from 'src/app/services/productionMonitoring.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './production-monitoring.component.html',
  styleUrls: ['./production-monitoring.component.css']
})
export class ProductionMonitoringComponent implements OnInit {
  selected = 'Well1';
  userId: string = "";
  wells : Well[];
  pmData : Productionmonitoring;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(
    private _pmService: ProductionMonitoringService
    ) { }

  getWells() : void
  {
    this._pmService.getWells().subscribe((data: Well[])=>{
      this.wells = data;
    });
  }

  //TODO rename
  getData() :  void
  {
     this._pmService.getData(this.pmData).subscribe((data : Productionmonitoring)=>{
        this.pmData = data;
    });
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

  onClickChart(){
    alert('Chart');
  }

onClickBtn(name: string){
alert(name);
}

  ngOnInit(): void {
    this.getWells();
  }

}
