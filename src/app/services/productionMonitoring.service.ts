import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DepthType } from '../enums/depth-type';
import { Periodicity } from '../enums/periodicity';
import { Productionmonitoring } from '../models/productionmonitoring/productionmonitoring';
import { FlowRateHistoryDataCommand } from '../models/Request/FlowRateHistoryDataCommand';
import { FlowRateSensorsCommand } from '../models/Request/FlowRateSensorsCommand';
import { PressureHistoryDataCommand } from '../models/Request/PressureHistoryDataCommand';
import { PressureSensorsCommand } from '../models/Request/PressureSensorsCommand';
import { WellboreProfileZonesCommand } from '../models/Request/WellboreProfileZonesCommand';
import { ZoneFlowProductionAcceptableLimitsCommand } from '../models/Request/ZoneFlowProductionAcceptableLimitsCommand';
import { ZoneFlowProductionHistoryDataCommand } from '../models/Request/ZoneFlowProductionHistoryDataCommand';
import { FlowRateHistoryDataResponse } from '../models/Response/FlowRateHistoryDataResponse';
import { FlowRateSensorsResponse } from '../models/Response/FlowRateSensorsResponse';
import { PressureHistoryDataResponse } from '../models/Response/PressureHistoryDataResponse';
import { PressureSensorsResponse } from '../models/Response/PressureSensorsResponse';
import { WellboreProfileZonesResponse } from '../models/Response/WellboreProfileZonesResponse';
import { ZoneFlowProductionAcceptableLimitsResponse } from '../models/Response/ZoneFlowProductionAcceptableLimitsResponse';
import { ZoneFlowProductionHistoryDataResponse } from '../models/Response/ZoneFlowProductionHistoryDataResponse';
import { ParamBuilder } from '../shared/pipes/parambuilder';
import { UrlHelper } from '../shared/pipes/urlhelper';

@Injectable({
  providedIn: 'root'
})
export class ProductionMonitoringService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  readonly AppUrl = environment.API_URL;
  public periodicityValue: BehaviorSubject<string> = new BehaviorSubject<string>('24H');
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


  async getWellboreProfileZones(wellboreProfileZonesCommand : WellboreProfileZonesCommand): Promise<WellboreProfileZonesResponse> {
    let params = ParamBuilder.toQueries(wellboreProfileZonesCommand);
    return this.http.get<WellboreProfileZonesResponse>(this.AppUrl + UrlHelper.WellboreProfileZones, { params : params, headers: this.headers }).toPromise();
  }

  getPressureSensors(pressureSensorsCommand : PressureSensorsCommand): Observable<PressureSensorsResponse> {
    let params = ParamBuilder.toQueries(pressureSensorsCommand);
    return this.http.get<PressureSensorsResponse>(this.AppUrl + UrlHelper.PressureSensors, {params : params, headers: this.headers });
  }

  async getPressureSensorsAsync(pressureSensorsCommand : PressureSensorsCommand): Promise<PressureSensorsResponse> {
    let params = ParamBuilder.toQueries(pressureSensorsCommand);
    return this.http.get<PressureSensorsResponse>(this.AppUrl + UrlHelper.PressureSensors, {params : params, headers: this.headers }).toPromise();
  }

  getFlowRateSensors(flowRateSensorsCommand : FlowRateSensorsCommand): Observable<FlowRateSensorsResponse> {
    let params = ParamBuilder.toQueries(flowRateSensorsCommand);
    return this.http.get<FlowRateSensorsResponse>(this.AppUrl + UrlHelper.FlowRateSensors, {params: params, headers: this.headers });
  }

  async getFlowRateSensorsAsync(flowRateSensorsCommand : FlowRateSensorsCommand): Promise<FlowRateSensorsResponse> {
    let params = ParamBuilder.toQueries(flowRateSensorsCommand);
    return this.http.get<FlowRateSensorsResponse>(this.AppUrl + UrlHelper.FlowRateSensors, {params: params, headers: this.headers }).toPromise();
  }

  getPressureHistoryData(pressureHistoryDataCommand : PressureHistoryDataCommand): Observable<PressureHistoryDataResponse> {
    let params = ParamBuilder.toQueries(pressureHistoryDataCommand);
    return this.http.get<PressureHistoryDataResponse>(this.AppUrl + UrlHelper.PressureHistoryData, {params: params, headers: this.headers });
  }
  async getPressureHistoryDataAsync(pressureHistoryDataCommand : PressureHistoryDataCommand): Promise<PressureHistoryDataResponse> {
    let params = ParamBuilder.toQueries(pressureHistoryDataCommand);
    return this.http.get<PressureHistoryDataResponse>(this.AppUrl + UrlHelper.PressureHistoryData, {params: params, headers: this.headers }).toPromise();
  }
  getFlowRateHistoryData(flowRateHistoryDataCommand : FlowRateHistoryDataCommand): Observable<FlowRateHistoryDataResponse> {
    let params = ParamBuilder.toQueries(flowRateHistoryDataCommand);
    return this.http.get<FlowRateHistoryDataResponse>(this.AppUrl + UrlHelper.FlowRateHistoryData, {params: params, headers: this.headers });
  }

  async getFlowRateHistoryDataAsync(flowRateHistoryDataCommand : FlowRateHistoryDataCommand): Promise<FlowRateHistoryDataResponse> {
    let params = ParamBuilder.toQueries(flowRateHistoryDataCommand);
    return this.http.get<FlowRateHistoryDataResponse>(this.AppUrl + UrlHelper.FlowRateHistoryData, {params: params, headers: this.headers }).toPromise();
  }

  getZoneFlowProductionHistoryData(zoneFlowProductionHistoryDataCommand : ZoneFlowProductionHistoryDataCommand): Observable<ZoneFlowProductionHistoryDataResponse> {
    let params = ParamBuilder.toQueries(zoneFlowProductionHistoryDataCommand);
    return this.http.get<ZoneFlowProductionHistoryDataResponse>(this.AppUrl + UrlHelper.ZoneFlowProductionHistoryData, { params: params, headers: this.headers });
  }

  GetZoneFlowProductionAcceptableLimits(zoneFlowProductionAcceptableLimitsCommand : ZoneFlowProductionAcceptableLimitsCommand): Observable<ZoneFlowProductionAcceptableLimitsResponse> {
    let params = ParamBuilder.toQueries(zoneFlowProductionAcceptableLimitsCommand);
    return this.http.get<ZoneFlowProductionAcceptableLimitsResponse>(this.AppUrl + UrlHelper.ZoneFlowProductionAcceptableLimits, { params: params, headers: this.headers });
  }

  getZoneFlowProductionHistoryDataRates(zoneFlowProductionHistoryDataCommand : ZoneFlowProductionHistoryDataCommand): Observable<ZoneFlowProductionAcceptableLimitsResponse> {
    let params = ParamBuilder.toQueries(zoneFlowProductionHistoryDataCommand);
    return this.http.get<ZoneFlowProductionAcceptableLimitsResponse>(this.AppUrl + UrlHelper.ZoneFlowProductionHistoryDataRates, { params: params, headers: this.headers });
  }

}
