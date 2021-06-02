import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedService} from './shared.service';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/aouthconfig.interceptor';
import { ProjectsComponent } from './projects/projects.component';
import { RoutingModule } from './routing/routing.module';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { HeaderComponent } from './header/header.component';
import { ChartsModule } from 'ng2-charts';
import { WellComponent } from './well/well.component';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";
import { TimechartsComponent } from './timecharts/timecharts.component';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist';
PlotlyModule.plotlyjs = PlotlyJS;
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectsComponent,
    HomeComponent,
    ViewComponent,
    HeaderComponent,
    WellComponent,
    SidebarComponent,
    FooterComponent,
    TimechartsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    ChartsModule,
    PlotlyModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/', pathMatch : 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'projects', component: ProjectsComponent}
    ]),
    RoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
