import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Productionmonitoring } from '../../../models/productionmonitoring/productionmonitoring';
import { Well } from '../../../models/well';
import { ProductionMonitoringService } from '../../../services/productionMonitoring.service';
import { ProductionMonitoringConstants } from '../../../models/constants/production-monitoring';
import { DialogContentComponent } from './dialog-content.component';

@Component({
  selector: 'app-well-sellection-with-buttons',
  templateUrl: './well-sellection-with-buttons.component.html',
  styleUrls: ['./well-sellection-with-buttons.component.scss'],
})
export class WellSellectionWithButtonsComponent {
  @Input() selectedWell = ProductionMonitoringConstants.selectedWellname;

  selected = '';

  wells: Well[];

  pmData: Productionmonitoring;

  constructor(
    private pmService: ProductionMonitoringService,
    public dialog: MatDialog,
  ) { }

  getWells(): void {
    this.pmService.getWells().subscribe((data: Well[]) => {
      this.wells = data;
    });
  }

  onClickCompare() {
    // this._pmService.Compare()
    alert('compare');
  }

  onClickComment() {
    alert('comment');
    // this._pmSService.Comment() alert('Comment');
  }

  onClickDisplay() {
    alert('Display');
  }

  openDialog() {
    this.dialog.open(DialogContentComponent);
    // const dialogRef = this.dialog.open(DialogContent);
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
}
