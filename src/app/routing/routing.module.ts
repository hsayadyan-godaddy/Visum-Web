import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ViewComponent } from '../view/view.component';
import { WellComponent } from '../well/well.component';
import { AuthGuard } from '../shared/auth.guard';
import { TimechartsComponent } from '../timecharts/timecharts.component';
import { MonitoringComponent } from '../monitoring/monitoring.component';

const routes: Routes = [
  { path: 'home' , component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard]},
  { path: 'well/:id', component: WellComponent, canActivate: [AuthGuard]},
  { path: 'timecharts', component: TimechartsComponent},
  { path: 'monitoring', component: MonitoringComponent},
  { path: '' , redirectTo:'/home',pathMatch:'full'},
  { path:'view/:id', component: ViewComponent, canActivate: [AuthGuard]}
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
