import { WSRequestType } from '../../enums/ws-request-type';

export const WebSocketAPISource = {

  /* production monitoring */
  PRODUCTION_MONITORING: {
    SUBSCRIBE_PRESSURE_DATA_UPDATES: {
      requestType: WSRequestType.Subscribe,
      operationSource: 'productionmonitoringwscontroller',
      methodName: 'pressuredataupdates',
    },

    SUBSCRIBE_FLOW_RATE_DATAUPDATE: {
      requestType: WSRequestType.Subscribe,
      operationSource: 'productionmonitoringwscontroller',
      methodName: 'flowratedataupdates',
    },

    SUBSCRIBE_ZONE_FLOW_PRODATION_DATAUPDATE: {
      requestType: WSRequestType.Subscribe,
      operationSource: 'productionmonitoringwscontroller',
      methodName: 'zoneflowproductiondataupdates',
    },
  },
};
