import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DepthType } from '../enums/depth-type';
import { Period } from '../enums/period';
import { Productionmonitoring } from '../models/productionmonitoring/productionmonitoring';

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
    return this.http.get(this.AppUrl + "wellboreProfile/zones", { params : params, headers: this.headers });
  }

  getPressureSensors(projectId: string, wellId: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('ProjectId', projectId);
    params = params.append('WellId', wellId);
    return this.http.get(this.AppUrl + "pressureFlowRate/pressure/sensors", {params : params, headers: this.headers });
  }

  getFlowRateSensors(projectId: string, wellId: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('ProjectId', projectId);
    params = params.append('WellId', wellId);
    return this.http.get(this.AppUrl + "pressureFlowRate/flowRate/sensors", {params: params, headers: this.headers });
  }

  getPressureHistoryData(
    sensorId: string,
    projectId: string,
    wellId: string,
    periodicity : Period,
    SnapshotSize : number,
    fromDate: number | null,
    toDate : number | null,
    nativeFromDate : number | null,
    nativeToDate : number | null
    ): Observable<any> {
    let params = new HttpParams();
    params = params.append('SensorId', sensorId);
    params = params.append('ProjectId', projectId);
    params = params.append('WellId', wellId);
    params = params.append('Periodicity', periodicity);
    params = params.append('SnapshotSize', SnapshotSize);
    params = params.append('FromDate', fromDate);
    params = params.append('ToDate', toDate);
    params = params.append('NativeFromDate', nativeFromDate);
    params = params.append('NativeToDate', nativeToDate);
    return this.http.get(this.AppUrl + "pressureFlowRate/pressure/historyData", {params: params, headers: this.headers });
  }

  getFlowRateHistoryData(
    sensorId: string,
    projectId: string,
    wellId: string,
    periodicity : Period,
    SnapshotSize : number,
    fromDate: number | null,
    toDate : number | null,
    nativeFromDate : number | null,
    nativeToDate : number | null
    ): Observable<any> {
    let params = new HttpParams();
    params = params.append('SensorId', sensorId);
    params = params.append('ProjectId', projectId);
    params = params.append('WellId', wellId);
    params = params.append('Periodicity', periodicity);
    params = params.append('SnapshotSize', SnapshotSize);
    params = params.append('FromDate', fromDate);
    params = params.append('ToDate', toDate);
    params = params.append('NativeFromDate', nativeFromDate);
    params = params.append('NativeToDate', nativeToDate);
    return this.http.get(this.AppUrl + "pressureFlowRate/flowRate/historyData", {params: params, headers: this.headers });
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
    toDate : number | null,
    nativeFromDate : number | null,
    nativeToDate : number | null
    ): Observable<any> {
    let params = new HttpParams();
    params = params.append('SensorId', sensorId);
    params = params.append('ProjectId', projectId);
    params = params.append('WellId', wellId);
    params = params.append('Periodicity', periodicity);
    params = params.append('SnapshotSize', SnapshotSize);
    params = params.append('FromDate', fromDate);
    params = params.append('ToDate', toDate);
    params = params.append('NativeFromDate', nativeFromDate);
    params = params.append('NativeToDate', nativeToDate);
    params = params.append('DepthType', depthType);
    params = params.append('ZoneNumber', zoneNumber);
    return this.http.get(this.AppUrl + "zoneFlowProduction/historyData", { params: params, headers: this.headers });
  }

  GetZoneFlowProductionAcceptableLimits(projectId: string, wellId: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('ProjectId', projectId);
    params = params.append('WellId', wellId);
    return this.http.get(this.AppUrl + "zoneFlowProduction/criticalHighlights", { params: params, headers: this.headers });
  }

}
