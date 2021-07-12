import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {WellboreSearchCommand} from 'src/app/models/Request/WellboreSearchCommand';
import {PeriodicElement} from '../../../models/WellSelector';
import {ProductionMonitoringService} from '../../../services/productionMonitoring.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {WellboreSearchResponse} from '../../../models/Response/WellboreSearchResponse';

@Component({
  selector: 'dialog-table',
  styleUrls: ['dialog-table.component.scss'],
  templateUrl: 'dialog-table.component.html',
})
export class DialogTableComponent implements OnInit {

  public selectedWell: string;
  public displayedColumns: string[] = ['Wellname', 'Padname', 'Field', 'Project'];
  public dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSize: number = 15;
  pageIndex: number;
  private searchString: string;

  constructor(public productionMonitoringService: ProductionMonitoringService) {
  }

  public selected(row) {
    this.selectedWell = row.Wellname;
  }

  public applyFilter(event: Event) {
    this.searchString = (event.target as HTMLInputElement).value;
    this.initTable(this.getWellboreSearchCommand(this.searchString));
    //this.dataSource.filter = searchString.trim().toLowerCase();
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
      console.log(response);

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
      context.dataSource.paginator = context.paginator;
      context.paginator.pageIndex = response.currentPageIndex;
      console.log(context.paginator);
    })(this);
  }

  private getWellboreSearchCommand(searchString: string): WellboreSearchCommand {
    return {
      SearchString: searchString,
      CurrentProjectId: null,
      NearbyWellsOnly: false,
      PageIndex: this.pageIndex,
      RecentWells: false,
      ResultsPerPage: this.pageSize * 100
    };
  }
}
