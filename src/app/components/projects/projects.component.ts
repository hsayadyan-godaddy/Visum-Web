import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../../services/shared.service';

export interface Project {
  id: string,
  projectName: string, 
  country: string, 
  reservoir: string, 
  pad:string,
  api:string, 
  field:string, 
  userId:string 
}


/**
 * @title Table with selection
 */
@Component({
  selector: 'table-selection-example',
  styleUrls: ['./projects.component.css'],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {

constructor(
  public sharedService : SharedService,
  public router : Router
)
{}


  displayedColumns: string[] = ['select', 'projectName', 'country', 'reservoir', 'pad', 'api', 'field', 'id'];
  dataSource : any[] = [];
  selection = new SelectionModel<Project>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Project): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id }`;
  }


  getProjectDetails(id){
    console.log(id);
    this.router.navigate(['/well', id]);
  }


  ngOnInit(){
    this.sharedService.getProjectList().subscribe((data:any[])=>{
      console.log(data);
      this.dataSource = data;
    })
  }
}
