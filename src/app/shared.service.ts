import { Injectable, NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly AppUrl = "http://localhost:5000/api";
  readonly url = "http://localhost:9092"

  constructor(
    private http: HttpClient,
    public router : Router,
    private _zone : NgZone
  ){}

  getServerSentEvent(id: string) : Observable<any> { // url:string well id

    return Observable.create(observer => {
      const eventSource = this.getEventSource(this.AppUrl+"/Data/"+id);
      eventSource.onmessage = event => {
        this._zone.run(()=> {
          observer.next(event);
        });
      };
      eventSource.onerror= error=> {
        this._zone.run(()=> {
          observer.error(error);
        });
      };
    });


  }

  private getEventSource(url: string) : EventSource {
    return new EventSource(url);
  }

  getProjectList() : Observable<any> {
   return this.http.get(this.AppUrl + "/projects")
  }

  getWellList(projectId)  : Observable<any> {
    return this.http.get(this.AppUrl + "/well/wells/"+ projectId )
  }
 
  getWellById(pid: string) : Observable<any> {
    return this.http.get(this.AppUrl + "/well/welldata/"+ pid );
  }
  
  //getWellData(wellId)  : Observable<any> {
    //return this.http.get(this.KafkaUrl )
  //}
}