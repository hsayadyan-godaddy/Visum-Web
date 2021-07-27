import { EventEmitter, Injectable } from '@angular/core';
import { WSRequest } from '../../models/websocket/ws-request';
import { WSResponse } from '../../models/websocket/ws-response';
import { WebSocketAPISource } from '../../models/websocket/api-ref/ws-api-source';
import { WSRequestSource } from '../../models/websocket/ws-request-source';
import { WebSocketService } from '../websocket/websocket.service';
import { WSResponseCheck } from '../websocket/helpers/ws-response-check';
import { ZoneFlowTimeOilWaterGas } from '../../models/productionmonitoring/ZoneFlowTimeOilWaterGas';
import { ZoneFlowProductionDataUpdatesRequestParameters } from '../../models/websocket/ws-request-parameters/zone-flow-production-data-updates-request-parameters';
import { DepthType } from '../../enums/depth-type';

@Injectable()
export class WsFlowMonitoringService {
  public onZoneFlowTimeOilWaterGas = new EventEmitter<{
    request: {
      originalRequest: WSRequest,
      zoneNumber: number
    },
    value: ZoneFlowTimeOilWaterGas
  }>(true);

  private readonly requestDictionary: {
    [key: string]: { originalRequest: WSRequest, zoneNumber: number }
  } = {};

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
      this.webSocketService.onNewMessage
        .subscribe((message: WSResponse<ZoneFlowTimeOilWaterGas>) => {
          const expectedOperation = WebSocketAPISource
            .PRODUCTION_MONITORING
            .SUBSCRIBE_ZONE_FLOW_PRODATION_DATAUPDATE;

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

    Object.keys(this.requestDictionary).forEach((k) => {
      if (this.requestDictionary[k]) {
        const value = this.requestDictionary[k];
        this.webSocketService.send(value.originalRequest);
      }
    });
  }

  subscribeUpdates(zoneNumber: number): void {
    const opSource: WSRequestSource = WebSocketAPISource
      .PRODUCTION_MONITORING
      .SUBSCRIBE_ZONE_FLOW_PRODATION_DATAUPDATE;

    const parameters: ZoneFlowProductionDataUpdatesRequestParameters = {
      projectId: '0EA456-45CD89456-1237-8F8A',
      wellId: 'LONG-HOLE-003',
      depthType: DepthType.MD,
      zoneNumber,
    };

    const request: WSRequest = new WSRequest(opSource, parameters);
    this.sendRequest(request, zoneNumber);
  }

  private sendRequest(request: WSRequest, zoneNum: number) {
    const key = request.sequenceId;
    this.requestDictionary[key] = { originalRequest: request, zoneNumber: zoneNum };
    this.webSocketService.send(request);
  }

  private todoHandleUpdates(
    request: { originalRequest: WSRequest, zoneNumber: number }, value: ZoneFlowTimeOilWaterGas,
  ): void {
    this.onZoneFlowTimeOilWaterGas.emit({ request, value });
  }

  // #endregion Private Methods (5)
}
