import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';


export interface Well{
  id: string,
  wellName: string,
  wellType: string,
  ProjectId: string
}

@Component({
  selector: 'app-well',
  templateUrl: './well.component.html',
  styleUrls: ['./well.component.css']
})
export class WellComponent implements OnInit {
  ProjectId : string;

  constructor(
    public sharedService : SharedService,
    public router : Router,
    private actRoute : ActivatedRoute
  ) { }

  displayedColumns: string[] = ['select', 'wellName', 'wellType', 'id'];
  dataSource : any[] = [];
  selection = new SelectionModel<Well>(true, []);

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

  // /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Well): string {
     if (!row) {
       return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id }`;
   }


  getWellData(id){
    console.log(id);
    this.router.navigate(['view/', id])
  }


  ngOnInit(){
    var pid = this.actRoute.snapshot.paramMap.get('id');
    this.sharedService.getWellList(pid).subscribe((data:any[])=>{
      console.log(data);
      this.dataSource = data;
    })

}}
