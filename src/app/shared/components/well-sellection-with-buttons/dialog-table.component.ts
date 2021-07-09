import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {PeriodicElement} from '../../../models/WellSelector'

var ELEMENT_DATA: PeriodicElement[] = [
  {Wellname: 'Well1', Padname: 'Hydrogen', Field: 'F1', Project: 'H'},
  {Wellname: 'Well2', Padname: 'Helium', Field: 'F2', Project: 'He'},
  {Wellname: 'Well3', Padname: 'Lithium', Field: 'F3', Project: 'Li'},
  {Wellname: 'Well4', Padname: 'Beryllium', Field: 'F4', Project: 'Be'},
  {Wellname: 'Well5', Padname: 'Boron', Field: 'F5', Project: 'B'},
  {Wellname: 'Well6', Padname: 'Carbon', Field: 'F6', Project: 'C'},
  {Wellname: 'Well7', Padname: 'Nitrogen', Field: 'F7', Project: 'N'},
  {Wellname: 'Well8', Padname: 'Oxygen', Field: 'F8', Project: 'O'},
  {Wellname: 'Well9', Padname: 'Fluorine', Field:'F9', Project: 'F'},
  {Wellname: 'Well10', Padname: 'Neon', Field: 'F10', Project: 'Ne'},
];

@Component({
  selector: 'dialog-table',
  styleUrls: ['dialog-table.component.css'],
  templateUrl: 'dialog-table.component.html',
})
export class DialogTableComponent  {

  public selectedWell:string;
  public displayedColumns: string[] = ['Wellname', 'Padname', 'Field', 'Project'];
  public dataSource = new MatTableDataSource(ELEMENT_DATA);

 public selected(row){
    this.selectedWell = row.Wellname;
  }
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
