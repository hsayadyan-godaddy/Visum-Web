import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Productionmonitoring } from '../models/productionmonitoring/productionmonitoring';

@Injectable({
  providedIn: 'root'
})
export class ProductionMonitoringService {
headers = new HttpHeaders().set('Content-Type','application/json');
  readonly AppUrl = environment.API_URL;

  constructor(
    private http: HttpClient
    ) { }
    
    getWells() : Observable<any>{
      return this.http.get(this.AppUrl+"/Wells/")
    }

    getDataByDepthType(type: string) : Observable<any>{
      return this.http.get(this.AppUrl+"/Data/"+type)
    }

    getData(pmRequest : Productionmonitoring)  : Observable<Productionmonitoring> {
      return this.http.post<Productionmonitoring>(this.AppUrl + "url", pmRequest, {headers : this.headers});
    }

}
