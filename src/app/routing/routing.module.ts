import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ViewComponent } from '../view/view.component';
import { WellComponent } from '../well/well.component';

const routes: Routes = [
  { path: 'home' , component: HomeComponent},
  { path: 'projects', component: ProjectsComponent},
  { path: 'well/:id', component: WellComponent},
  { path: '' , redirectTo:'/home',pathMatch:'full'},
  { path:'view/:id', component: ViewComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class RoutingModule { }
