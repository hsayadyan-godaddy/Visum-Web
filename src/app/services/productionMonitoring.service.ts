import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable , forkJoin } from 'rxjs';
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
import {WellboreSearchCommand} from '../models/Request/WellboreSearchCommand';
import {WellboreSearchResponse} from '../models/Response/WellboreSearchResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductionMonitoringService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  readonly AppUrl = environment.API_URL;
  public periodicity: BehaviorSubject<Periodicity> = new BehaviorSubject<Periodicity>(Periodicity.Hours24);
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
  
  async getWellboreSearch(wellboreSearchCommand : WellboreSearchCommand): Promise<WellboreSearchResponse> {
    let params = ParamBuilder.toQueries(wellboreSearchCommand);
    return this.http.get<WellboreSearchResponse>(this.AppUrl + UrlHelper.WellboreSearch, { params : params, headers: this.headers }).toPromise();
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

 // getZoneFlowProductionAcceptableLimits(zoneFlowProductionAcceptableLimitsCommand : ZoneFlowProductionAcceptableLimitsCommand): Observable<ZoneFlowProductionAcceptableLimitsResponse> {
  getZoneFlowRateProductionHistoryData(zoneFlowProductionHistoryDataCommand : ZoneFlowProductionHistoryDataCommand): Observable<ZoneFlowProductionHistoryDataResponse> {
    let params = ParamBuilder.toQueries(zoneFlowProductionHistoryDataCommand);
    return this.http.get<ZoneFlowProductionHistoryDataResponse>(this.AppUrl + UrlHelper.ZoneFlowRateProductionHistoryData, { params: params, headers: this.headers });
  }

  getZoneFlowRateDataFromMultipleZones(noOfZone: number, depthType: DepthType): Observable<ZoneFlowProductionHistoryDataResponse[]> {
    let ZoneResponses : Observable<ZoneFlowProductionHistoryDataResponse>[] = [];
    for(let i = 1 ; i <= noOfZone; i++) {
       let zoneFlowProductionHistoryDataCommand : ZoneFlowProductionHistoryDataCommand= {
        zoneNumber: i,
        depthType: depthType,
        periodicity: Periodicity.Hours24,
        snapshotSize: 100,
        projectId: 'sdsd',
        wellId: 'sju',
      };
      let params = ParamBuilder.toQueries(zoneFlowProductionHistoryDataCommand);
      ZoneResponses.push(this.http.get<ZoneFlowProductionHistoryDataResponse>(this.AppUrl + UrlHelper.ZoneFlowRateProductionHistoryData, { params: params, headers: this.headers }));
    }
    return forkJoin(ZoneResponses);
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
