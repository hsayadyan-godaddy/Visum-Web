import { EventEmitter, Injectable } from '@angular/core';
import { WSRequest } from '../../models/websocket/ws-request';
import { TimeValue } from '../../models/production-monitoring/time-value';
import { WSResponse } from '../../models/websocket/ws-response';
import { WebSocketService } from '../websocket/websocket.service';
import { WSResponseCheck } from '../websocket/helpers/ws-response-check';
import { WebSocketAPISource } from '../../models/websocket/api-ref/ws-api-source';
import { WSRequestSource } from '../../models/websocket/ws-request-source';
import { PressureDataUpdatesRequestParameters } from '../../models/websocket/ws-request-parameters/pressure-data-updates-request-parameters';

@Injectable()
export class WsPressureMoniteringService {
  public onNewTimeValueResponse = new EventEmitter<{
    params: PressureDataUpdatesRequestParameters,
    value: TimeValue
  }>(true); // subscribe and TODO something

  private readonly requestDictionary: {
    [key: string]: {
      pressureRequest: WSRequest, params: PressureDataUpdatesRequestParameters
    }
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
      this.webSocketService.onNewMessage.subscribe((message: WSResponse<TimeValue>) => {
        const expectedOperation = WebSocketAPISource
          .PRODUCTION_MONITORING
          .SUBSCRIBE_PRESSURE_DATA_UPDATES;

        const allowed = WSResponseCheck.Allowed(message, expectedOperation);
        if (allowed) {
          const key = message.sequenceId;
          const refRequest = this.requestDictionary[key];
          if (refRequest) {
            this.todoHandleUpdates(refRequest.params, message.response);
          }
        } else if (message.statusCode >= 500) {
          setTimeout(() => {
            this.resetContext(false);
          }, 3000);
        }
      });
    }

    Object.keys(this.requestDictionary).forEach((k) => {
      if (this.requestDictionary[k]) {
        const value = this.requestDictionary[k];
        this.webSocketService.send(value.pressureRequest);
      }
    });
  }

  subscribeUpdates(parameters: PressureDataUpdatesRequestParameters): void {
    const opSource: WSRequestSource = WebSocketAPISource
      .PRODUCTION_MONITORING
      .SUBSCRIBE_PRESSURE_DATA_UPDATES;

    const request: WSRequest = new WSRequest(opSource, parameters);
    this.sendRequest(request, parameters);
  }

  private sendRequest(request: WSRequest, params: PressureDataUpdatesRequestParameters) {
    const key = request.sequenceId;
    this.requestDictionary[key] = { pressureRequest: request, params };
    this.webSocketService.send(request);
  }

  private todoHandleUpdates(params: PressureDataUpdatesRequestParameters, value: TimeValue): void {
    this.onNewTimeValueResponse.emit({ params, value });
  }
}
