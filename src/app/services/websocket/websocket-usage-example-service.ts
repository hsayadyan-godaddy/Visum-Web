import { EventEmitter, Injectable } from '@angular/core';
import { WSRequest } from '../../models/websocket/ws-request';
import { TimeValue } from '../../models/production-monitoring/time-value';
import { WSResponse } from '../../models/websocket/ws-response';
import { WebSocketService } from './websocket.service';
import { WSResponseCheck } from './helpers/ws-response-check';
import { WebSocketAPISource } from '../../models/websocket/api-ref/ws-api-source';
import { WSRequestSource } from '../../models/websocket/ws-request-source';
import { PressureDataUpdatesRequestParameters } from '../../models/websocket/ws-request-parameters/pressure-data-updates-request-parameters';

@Injectable()
export class WebsocketUsageExampleService {
  public onNewTimeValueResponse =
  new EventEmitter<{ request: WSRequest, value: TimeValue }>(true); // subscribe and TODO something

  private readonly requestDictionary: { [key: string]: { request: WSRequest } } = {};

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
      this.webSocketService.onNewMessage.subscribe((message: WSResponse<TimeValue>) => {
        const expectedOperation = WebSocketAPISource
          .PRODUCTION_MONITORING
          .SUBSCRIBE_PRESSURE_DATA_UPDATES;

        const allowed = WSResponseCheck.Allowed(message, expectedOperation);
        if (allowed) {
          const key = message.sequenceId;
          const refRequest = this.requestDictionary[key];
          if (refRequest) {
            this.todoHandleUpdates(refRequest.request, message.response);
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
        this.webSocketService.send(value.request);
      }
    });
  }

  private subscribeUpdates(): void {
    const opSource: WSRequestSource = WebSocketAPISource
      .PRODUCTION_MONITORING
      .SUBSCRIBE_PRESSURE_DATA_UPDATES;

    const parameters: PressureDataUpdatesRequestParameters = {
      projectId: '0EA456-45CD89456-1237-8F8A',
      wellId: 'LONG-HOLE-003',
      sensorId: 'ABC-PRESS-',
    };

    const request: WSRequest = new WSRequest(opSource, parameters);
    this.sendRequest(request);
  }

  private sendRequest(request: WSRequest) {
    const key = request.sequenceId;
    this.requestDictionary[key] = { request };
    this.webSocketService.send(request);
  }

  private todoHandleUpdates(request: WSRequest, value: TimeValue): void {
    this.onNewTimeValueResponse.emit({ request, value });
  }

  // #endregion Private Methods (5)
}
