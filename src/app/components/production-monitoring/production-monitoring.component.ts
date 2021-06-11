import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
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
