import { AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../../../models/WellSelector'

var CURRENT_PROJECT_ELEMENT_DATA: PeriodicElement[] = [
  { Wellname: 'Well1', Padname: 'Hydrogen', Field: 'F1', Project: 'H' },
  { Wellname: 'Well2', Padname: 'Helium', Field: 'F2', Project: 'He' },
  { Wellname: 'Well3', Padname: 'Lithium', Field: 'F3', Project: 'Li' },
  { Wellname: 'Well4', Padname: 'Beryllium', Field: 'F4', Project: 'Be' },
  { Wellname: 'Well5', Padname: 'Boron', Field: 'F5', Project: 'B' },
  { Wellname: 'Well6', Padname: 'Carbon', Field: 'F6', Project: 'C' },
  { Wellname: 'Well7', Padname: 'Nitrogen', Field: 'F7', Project: 'N' },
  { Wellname: 'Well8', Padname: 'Oxygen', Field: 'F8', Project: 'O' },
  { Wellname: 'Well9', Padname: 'Fluorine', Field: 'F9', Project: 'F' },
  { Wellname: 'Well10', Padname: 'Neon', Field: 'F10', Project: 'Ne' },
];

var RECENT_WELLS_ELEMENT_DATA: PeriodicElement[] = [
  { Wellname: 'Well1', Padname: 'Hydrogen', Field: 'F1', Project: 'H' },
  { Wellname: 'Well2', Padname: 'Helium', Field: 'F2', Project: 'He' },
  { Wellname: 'Well3', Padname: 'Lithium', Field: 'F3', Project: 'Li' },
  { Wellname: 'Well4', Padname: 'Beryllium', Field: 'F4', Project: 'Be' },
  { Wellname: 'Well5', Padname: 'Boron', Field: 'F5', Project: 'B' },
 
];

var ALL_WELLS_ELEMENT_DATA: PeriodicElement[] = [
  { Wellname: 'Well1', Padname: 'Hydrogen', Field: 'F1', Project: 'H' },
  { Wellname: 'Well2', Padname: 'Helium', Field: 'F2', Project: 'He' },
  { Wellname: 'Well3', Padname: 'Lithium', Field: 'F3', Project: 'Li' },
  { Wellname: 'Well4', Padname: 'Beryllium', Field: 'F4', Project: 'Be' },
  { Wellname: 'Well5', Padname: 'Boron', Field: 'F5', Project: 'B' },
  { Wellname: 'Well6', Padname: 'Carbon', Field: 'F6', Project: 'C' },
  { Wellname: 'Well7', Padname: 'Nitrogen', Field: 'F7', Project: 'N' },
  { Wellname: 'Well8', Padname: 'Oxygen', Field: 'F8', Project: 'O' },
  { Wellname: 'Well9', Padname: 'Fluorine', Field: 'F9', Project: 'F' },
  { Wellname: 'Well10', Padname: 'Neon', Field: 'F10', Project: 'Ne' },
  { Wellname: 'Well11', Padname: 'Hydrogen', Field: 'F11', Project: 'H' },
  { Wellname: 'Well12', Padname: 'Helium', Field: 'F12', Project: 'He' },
  { Wellname: 'Well13', Padname: 'Lithium', Field: 'F13', Project: 'Li' },
  { Wellname: 'Well14', Padname: 'Beryllium', Field: 'F14', Project: 'Be' },
  { Wellname: 'Well15', Padname: 'Boron', Field: 'F15', Project: 'B' },
  { Wellname: 'Well16', Padname: 'Carbon', Field: 'F16', Project: 'C' },
  { Wellname: 'Well17', Padname: 'Nitrogen', Field: 'F17', Project: 'N' },
  { Wellname: 'Well18', Padname: 'Oxygen', Field: 'F18', Project: 'O' },
  { Wellname: 'Well19', Padname: 'Fluorine', Field: 'F19', Project: 'F' },
  { Wellname: 'Well20', Padname: 'Neon', Field: 'F20', Project: 'Ne' },
];

@Component({
  selector: 'dialog-table',
  styleUrls: ['dialog-table.component.scss'],
  templateUrl: 'dialog-table.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DialogTableComponent implements OnInit{
  
  
  public selectedWell: string;
  public displayedColumns: string[] = ['Wellname', 'Padname', 'Field', 'Project'];
  public currentProjectDataSource = new MatTableDataSource(CURRENT_PROJECT_ELEMENT_DATA);
  public recentWellsDataSource = new MatTableDataSource(RECENT_WELLS_ELEMENT_DATA);
  public allWellsDataSource = new MatTableDataSource(ALL_WELLS_ELEMENT_DATA);
  public currentProject: string = "Current Project";
  public recentWells: string = "Recent Wells";
  public allWells: string = "All Wells";

  ngOnInit(): void {
    this.currentProject = "Current Project " + "(" + this.currentProjectDataSource.data.length + ")";
    this.recentWells = "Recent Wells " + "(" + this.recentWellsDataSource.data.length + ")";
    this.allWells = "All Wells " + "(" + this.allWellsDataSource.data.length + ")";
  }
  public selected(row) {
    this.selectedWell = row.Wellname;
  }
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentProjectDataSource.filter = filterValue.trim().toLowerCase();
    this.recentWellsDataSource.filter = filterValue.trim().toLowerCase();
    this.allWellsDataSource.filter = filterValue.trim().toLowerCase();

    
    this.currentProject = "Current Project " + "(" + this.currentProjectDataSource.filteredData.length + ")";
    this.recentWells = "Recent Wells " + "(" + this.recentWellsDataSource.filteredData.length + ")";
    this.allWells = "All Wells " + "(" + this.allWellsDataSource.filteredData.length + ")";
  }
}
