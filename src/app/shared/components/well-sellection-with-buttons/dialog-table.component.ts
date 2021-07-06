import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


export interface PeriodicElement {
  Wellname: string;
  Padname: string;
  Field: string;
  Project: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
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
export class DialogTableComponent {
  displayedColumns: string[] = ['Wellname', 'Padname', 'Field', 'Project'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource1 = new MatTableDataSource(ELEMENT_DATA);
  dataSource2 = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource1.paginator = this.paginator;
    this.dataSource2.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
}
