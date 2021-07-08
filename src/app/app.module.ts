import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedService} from './services/shared.service';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/aouthconfig.interceptor';
import { ProjectsComponent } from './components/projects/projects.component';
import { RoutingModule } from './routing/routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { WellComponent } from './components/well/well.component';
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { TimechartsComponent } from './components/timecharts/timecharts.component';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist';
import { ProductionMonitoringComponent } from './components/production-monitoring/production-monitoring.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PressureflowratechartComponent } from './shared/components/pressureflowratechart/pressureflowratechart.component';
import { DepthTimeComponent } from './shared/components/depth-time/depth-time.component';
import { WellSellectionWithButtonsComponent } from './shared/components/well-sellection-with-buttons/well-sellection-with-buttons.component';
import { MonitoringChartsComponent } from './shared/components/monitoring-charts/monitoring-charts.component';
import { ZoneFlowAllocationComponent } from './components/production-monitoring/zone-flow-allocation/zone-flow-allocation.component';
import { WebSocketService } from './services/websocket/websocket.service';
import { WebsocketUsageExampleService } from './services/websocket/websocket-usage-example-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WsFlowMonitoringService } from './services/ws-production-monitoring/ws-flow-monitoring.service';
import { WsPressureMoniteringService } from "./services/ws-production-monitoring/ws-pressure-monitoring.service";
import { ZoneChartComponent } from './shared/components/zone-chart/zone-chart.component';
import {DemoMaterialModule} from './shared/components/well-sellection-with-buttons/material-module';
import {DialogContent} from './shared/components/well-sellection-with-buttons/well-sellection-with-buttons.component';
import {DialogTableComponent} from './shared/components/well-sellection-with-buttons/dialog-table.component'
PlotlyModule.plotlyjs = PlotlyJS;
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectsComponent,
    HomeComponent,
    HeaderComponent,
    WellComponent,
    SidebarComponent,
    FooterComponent,
    TimechartsComponent,
    ProductionMonitoringComponent,
    PressureflowratechartComponent,
    DepthTimeComponent,
    WellSellectionWithButtonsComponent,
    ZoneFlowAllocationComponent,
    MonitoringChartsComponent,
    ZoneChartComponent,
    DialogContent,
    DialogTableComponent
  ],
  imports: [
    DemoMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    PlotlyModule,
    MatNativeDateModule,
    MatDatepickerModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/', pathMatch : 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'projects', component: ProjectsComponent}
    ]),
    RoutingModule,
      NgbModule 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    WebSocketService,
    WebsocketUsageExampleService,
    WsFlowMonitoringService,
    WsPressureMoniteringService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
