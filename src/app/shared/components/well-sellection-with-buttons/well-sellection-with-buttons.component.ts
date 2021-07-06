import { Component, OnInit } from '@angular/core';
import { Productionmonitoring } from 'src/app/models/productionmonitoring/productionmonitoring';
import { Well } from 'src/app/models/well';
import { ProductionMonitoringService } from 'src/app/services/productionMonitoring.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-well-sellection-with-buttons',
  templateUrl: './well-sellection-with-buttons.component.html',
  styleUrls: ['./well-sellection-with-buttons.component.css']
})
export class WellSellectionWithButtonsComponent implements OnInit {
  selected = '';
  wells : Well[];
  pmData : Productionmonitoring;

  constructor(
    private _pmService: ProductionMonitoringService,
    public dialog: MatDialog
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

  openDialog() {
    const dialogRef = this.dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
})
export class DialogContent {}
