import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductionMonitoringService {

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

}
