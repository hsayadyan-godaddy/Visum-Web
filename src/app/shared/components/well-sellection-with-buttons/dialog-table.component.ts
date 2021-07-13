import { AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { WellboreSearchCommand } from '../../../models/Request/WellboreSearchCommand';
import { WellboreSearchResponse } from '../../../models/Response/WellboreSearchResponse';
import { ProductionMonitoringService } from '../../../services/productionMonitoring.service';
import { PeriodicElement } from '../../../models/WellSelector'

@Component({
  selector: 'dialog-table',
  styleUrls: ['dialog-table.component.scss'],
  templateUrl: 'dialog-table.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DialogTableComponent implements OnInit {
  public wellboreData: PeriodicElement[] = [];
  public selectedWell: string;
  public displayedColumns: string[] = ['Wellname', 'Padname', 'Field', 'Project'];
  public currentProjectDataSource = new MatTableDataSource(this.wellboreData);
  public recentWellsDataSource = new MatTableDataSource(this.wellboreData);
  public allWellsDataSource = new MatTableDataSource(this.wellboreData);
  public currentProject: string = "Current Project";
  public recentWells: string = "Recent Wells";
  public allWells: string = "All Wells";
  private wellboreSearchCommand: WellboreSearchCommand;
  private wellboreSearchReasponse: WellboreSearchResponse;
  private isShowNearbyWellsOnly: boolean;
  private isRecentWellsSelected: boolean;
  private isCurrentProjectWellsSelected: boolean;
  private isAllWellsSelected: boolean;
  private searchtext: string;

  constructor(public pmService: ProductionMonitoringService) { }

  ngOnInit(): void {
    this.getWellData();
    this.currentProject = "Current Project " + "(" + this.currentProjectDataSource.data.length + ")";
    this.recentWells = "Recent Wells " + "(" + this.recentWellsDataSource.data.length + ")";
    this.allWells = "All Wells " + "(" + this.allWellsDataSource.data.length + ")";
  }

  onShowNearbyWellsOnlyChange(ob: MatCheckboxChange) {
    this.isShowNearbyWellsOnly = (this.isShowNearbyWellsOnly) ? false : true;
    this.getWellData();
  }

  tabChanged(ob: MatTabChangeEvent) {
    switch (ob.index) {
      case 0:
        this.isRecentWellsSelected = false;
        this.isCurrentProjectWellsSelected = true;
        this.isAllWellsSelected = false;
        break;
      case 1:
        this.isRecentWellsSelected = true;
        this.isCurrentProjectWellsSelected = false;
        this.isAllWellsSelected = false;
        break;
      case 2:
        this.isRecentWellsSelected = false;
        this.isCurrentProjectWellsSelected = false;
        this.isAllWellsSelected = true;
        break;
      default:
        break;
    }
    this.getWellData();
  }

  public async getWellData() {
    this.wellboreSearchCommand = {
      CurrentProjectId: "projectid",
      NearbyWellsOnly: this.isShowNearbyWellsOnly,
      PageIndex: 1,
      RecentWells: this.isRecentWellsSelected,
      ResultsPerPage: 20,
      SearchString: this.searchtext
    };
    await this.pmService.getWellboreSearch(this.wellboreSearchCommand).then(data => {
      this.wellboreSearchReasponse = data;
      this.wellboreSearchReasponse.result.forEach(element => {
        this.wellboreData.forEach(wd => {
          wd.Field = element.project.field,
            wd.Padname = element.project.padName,
            wd.Project = element.project.projectId,
            wd.Wellname = element.wellbore.wellId
        })
      });

    })
  }

  public selected(row) {
    this.selectedWell = row.Wellname;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchtext = filterValue.trim().toLowerCase();
    this.currentProjectDataSource.filter = filterValue.trim().toLowerCase();
    this.recentWellsDataSource.filter = filterValue.trim().toLowerCase();
    this.allWellsDataSource.filter = filterValue.trim().toLowerCase();


    this.currentProject = "Current Project " + "(" + this.currentProjectDataSource.filteredData.length + ")";
    this.recentWells = "Recent Wells " + "(" + this.recentWellsDataSource.filteredData.length + ")";
    this.allWells = "All Wells " + "(" + this.allWellsDataSource.filteredData.length + ")";
  }
}
