import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WellboreSearchCommand } from '../../../models/Request/WellboreSearchCommand';
import { PeriodicElement } from '../../../models/WellSelector';
import { ProductionMonitoringService } from '../../../services/productionMonitoring.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { WellboreSearchResponse } from '../../../models/Response/WellboreSearchResponse';
import {ProductionMonitoringConstants} from '../../../models/constants/production-monitoring'
@Component({
  selector: 'dialog-table',
  styleUrls: ['dialog-table.component.scss'],
  templateUrl: 'dialog-table.component.html',
})
export class DialogTableComponent implements OnInit {

  public selectedWell: string;
  public displayedColumns: string[] = ['Wellname', 'Padname', 'Field', 'Project'];
  public dataSource: MatTableDataSource<PeriodicElement>;

  pageSize: number = 15;
  pageIndex: number;
  private searchString: string;
  public currentProject: string = ProductionMonitoringConstants.currentProject;
  public recentWells: string = ProductionMonitoringConstants.recentWells;
  public allWells: string = ProductionMonitoringConstants.allWells;
  constructor(public productionMonitoringService: ProductionMonitoringService) {
  }

  public selected(row) {
    this.selectedWell = row.Wellname;
  }

  public applyFilter(event: Event) {
    this.searchString = (event.target as HTMLInputElement).value;
    this.initTable(this.getWellboreSearchCommand(this.searchString));
  }

  ngOnInit(): void {
    this.initTable(this.getWellboreSearchCommand(''));
  }

  pageEvent($event: PageEvent) {
    // const command = this.getWellboreSearchCommand(this.searchString);
    // command.PageIndex = $event.pageIndex;
    // command.ResultsPerPage = $event.pageSize;
    // this.initTable(command);
  }

  private initTable(command: WellboreSearchCommand) {
    (async (context) => {
      const response: WellboreSearchResponse = await context.productionMonitoringService.getWellboreSearch(command);
      this.currentProject = ProductionMonitoringConstants.currentProject + "(" + response.result.length + ")";
      this.recentWells = ProductionMonitoringConstants.recentWells + "(" + response.result.length + ")";
      this.allWells = ProductionMonitoringConstants.allWells + "(" + response.result.length + ")";
      context.dataSource = new MatTableDataSource<PeriodicElement>(response
        .result.map(x => {
          const item: PeriodicElement = {
            Wellname: x.wellbore.name,
            Padname: x.project.padName,
            Field: x.project.field,
            Project: x.project.name
          };
          return item;
        }));
    })(this);
  }

  private getWellboreSearchCommand(searchString: string): WellboreSearchCommand {
    return {
      SearchString: searchString,
      CurrentProjectId: null,
      NearbyWellsOnly: false,
      PageIndex: this.pageIndex,
      RecentWells: false,
      ResultsPerPage: this.pageSize * 10
    };
  }
}
