import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DepthType } from '../enums/depth-type';
import { Period } from '../enums/period';
import { Productionmonitoring } from '../models/productionmonitoring/productionmonitoring';
import { UrlHelper } from '../shared/pipes/urlhelper';

@Injectable({
  providedIn: 'root'
})
export class ProductionMonitoringService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  readonly AppUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  getWells(): Observable<any> {
    return this.http.get(this.AppUrl + "/Wells/")
  }

  getDataByDepthType(type: string): Observable<any> {
    return this.http.get(this.AppUrl + "/Data/" + type)
  }

  getData(pmRequest: Productionmonitoring): Observable<Productionmonitoring> {
    return this.http.post<Productionmonitoring>(this.AppUrl + "url", pmRequest, { headers: this.headers });
  }


  getWellboreProfileZones(projectId: string, wellId: string, depthType: DepthType): Observable<any> {
    let params = new HttpParams();
    params = params.append('ProjectId', projectId);
    params = params.append('WellId', wellId);
    params = params.append('DepthType', depthType);
    return this.http.get(this.AppUrl + UrlHelper.WellboreProfileZones, { params : params, headers: this.headers });
  }

  getPressureSensors(projectId: string, wellId: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('ProjectId', projectId);
    params = params.append('WellId', wellId);
    return this.http.get(this.AppUrl + UrlHelper.PressureSensors, {params : params, headers: this.headers });
  }

  getFlowRateSensors(projectId: string, wellId: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('ProjectId', projectId);
    params = params.append('WellId', wellId);
    return this.http.get(this.AppUrl + UrlHelper.FlowRateSensors, {params: params, headers: this.headers });
  }

  getPressureHistoryData(
    sensorId: string,
    projectId: string,
    wellId: string,
    periodicity : Period,
    SnapshotSize : number,
    fromDate: number | null,
    toDate : number | null
    ): Observable<any> {
    let params = new HttpParams();
    params = params.append('SensorId', sensorId);
    params = params.append('ProjectId', projectId);
    params = params.append('WellId', wellId);
    params = params.append('Periodicity', periodicity);
    params = params.append('SnapshotSize', SnapshotSize);
    params = params.append('FromDate', fromDate);
    params = params.append('ToDate', toDate);
    return this.http.get(this.AppUrl + UrlHelper.PressureHistoryData, {params: params, headers: this.headers });
  }

  getFlowRateHistoryData(
    sensorId: string,
    projectId: string,
    wellId: string,
    periodicity : Period,
    SnapshotSize : number,
    fromDate: number | null,
    toDate : number | null
    ): Observable<any> {
    let params = new HttpParams();
    params = params.append('SensorId', sensorId);
    params = params.append('ProjectId', projectId);
    params = params.append('WellId', wellId);
    params = params.append('Periodicity', periodicity);
    params = params.append('SnapshotSize', SnapshotSize);
    params = params.append('FromDate', fromDate);
    params = params.append('ToDate', toDate);
    return this.http.get(this.AppUrl + UrlHelper.FlowRateHistoryData, {params: params, headers: this.headers });
  }

  getZoneFlowProductionHistoryData(
    depthType : DepthType,
     zoneNumber: number,
     sensorId: string,
    projectId: string,
    wellId: string,
    periodicity : Period,
    SnapshotSize : number,
    fromDate: number | null,
    toDate : number | null
    ): Observable<any> {
    let params = new HttpParams();
    params = params.append('SensorId', sensorId);
    params = params.append('ProjectId', projectId);
    params = params.append('WellId', wellId);
    params = params.append('Periodicity', periodicity);
    params = params.append('SnapshotSize', SnapshotSize);
    params = params.append('FromDate', fromDate);
    params = params.append('ToDate', toDate);
    params = params.append('DepthType', depthType);
    params = params.append('ZoneNumber', zoneNumber);
    return this.http.get(this.AppUrl + UrlHelper.ZoneFlowProductionHistoryData, { params: params, headers: this.headers });
  }

  GetZoneFlowProductionAcceptableLimits(projectId: string, wellId: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('ProjectId', projectId);
    params = params.append('WellId', wellId);
    return this.http.get(this.AppUrl + UrlHelper.ZoneFlowProductionAcceptableLimits, { params: params, headers: this.headers });
  }

}
