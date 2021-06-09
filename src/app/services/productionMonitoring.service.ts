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
    
    getWellNamesByUserId(id: string) : Observable<any>{
      return this.http.get(this.AppUrl+"/????/"+id)
    }

    getDataByDepthType(type: string) : Observable<any>{
      return this.http.get(this.AppUrl+"/???/"+type)
    }

}
