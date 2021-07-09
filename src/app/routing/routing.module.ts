import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { WellComponent } from '../components/well/well.component';
import { AuthGuard } from '../guards/auth.guard';
import { TimechartsComponent } from '../components/timecharts/timecharts.component';
import { ProductionMonitoringComponent } from '../components/production-monitoring/production-monitoring.component';
import { ZoneFlowAllocationChartComponent } from '../shared/components/zone-flow-allocation-chart/zone-flow-allocation-chart.component';
import { PressureflowratechartComponent } from '../shared/components/pressureflowratechart/pressureflowratechart.component';

const routes: Routes = [
  { path: 'home' , component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard]},
  { path: 'well/:id', component: WellComponent, canActivate: [AuthGuard]},
  { path: 'timecharts', component: TimechartsComponent},
  { path: 'production-monitoring', component: ProductionMonitoringComponent},
  { path: 'zoneflowcharts', component: ZoneFlowAllocationChartComponent},
  { path: 'pressurechart', component: PressureflowratechartComponent},
  { path: '' , redirectTo:'/home',pathMatch:'full'},
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
