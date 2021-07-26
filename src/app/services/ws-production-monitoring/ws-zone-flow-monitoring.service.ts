import { EventEmitter, Injectable } from '@angular/core';
import { DepthType } from 'src/app/enums/depth-type';
import { Periodicity } from 'src/app/enums/periodicity';
import { ZoneFlowTimeOilWaterGas } from 'src/app/models/productionmonitoring/ZoneFlowTimeOilWaterGas';
import { ZoneFlowProductionHistoryDataCommand } from 'src/app/models/Request/ZoneFlowProductionHistoryDataCommand';
import { WebSocketAPISource } from 'src/app/models/websocket/api-ref/ws-api-source';
import { WSRequest } from 'src/app/models/websocket/ws-request';
import { WSRequestSource } from 'src/app/models/websocket/ws-request-source';
import { WSResponse } from 'src/app/models/websocket/ws-response';
import { WSResponseCheck } from '../websocket/helpers/ws-response-check';
import { WebSocketService } from '../websocket/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class WsZoneFlowMonitoringService {

  public onZoneFlowTimeOilWaterGas = new EventEmitter<{ request: {
    originalRequest: WSRequest , 
    zoneNumber : number
  },
  value: ZoneFlowTimeOilWaterGas }>(true);

  private readonly requestDictionary: { [key: string]: { originalRequest: WSRequest , zoneNumber: number} } = {};

  constructor(private webSocketService: WebSocketService) {
    this.connectWS();
  }


  private connectWS() {
    this.webSocketService.onConnected.subscribe((connected: boolean) => {
      if (connected) {
        this.resetContext(false);
      }
    });

    this.resetContext();
  }

  private resetContext(initialization: boolean = true) {
    if (initialization) {
      this.webSocketService.onNewMessage.subscribe((message: WSResponse<ZoneFlowTimeOilWaterGas>) => {


        const expectedOperation = WebSocketAPISource
          .PRODUCTION_MONITORING
          .SUBSCRIBE_ZONE_FLOW_PRODATION_DATARATEUPDATE;

        const allowed = WSResponseCheck.Allowed(message, expectedOperation);
        if (allowed) {
          const key = message.sequenceId;
          const refRequest = this.requestDictionary[key];
          if (refRequest) {

            this.todoHandleUpdates(refRequest, message.response);
          }

        } else if (message.statusCode >= 500) {

          // reasonable to reset subscription on internal server error
          setTimeout(() => {
            this.resetContext(false);
          }, 3000);
        }
      });
    }

    for (const k in this.requestDictionary) {
      if (this.requestDictionary[k]) {
        const value = this.requestDictionary[k];
        this.webSocketService.send(value.originalRequest);
      }
    }
  }

  subscribeUpdates(parameters: ZoneFlowProductionHistoryDataCommand): void {
    const opSource: WSRequestSource = WebSocketAPISource
      .PRODUCTION_MONITORING
      .SUBSCRIBE_ZONE_FLOW_PRODATION_DATARATEUPDATE;

    const request: WSRequest = new WSRequest(opSource, parameters);
    this.sendRequest(request , parameters.zoneNumber);
  }

  private sendRequest(request: WSRequest , zoneNumb : number) {
    const key = request.sequenceId;
    this.requestDictionary[key] = {originalRequest: request , zoneNumber: zoneNumb};
    this.webSocketService.send(request);
  }

  private todoHandleUpdates(request: {originalRequest: WSRequest , zoneNumber : number}, value: ZoneFlowTimeOilWaterGas): void {
    this.onZoneFlowTimeOilWaterGas.emit({ request, value });
  }
}
