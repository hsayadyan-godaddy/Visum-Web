import {DepthType} from '../../enums/depth-type';
import {ZoneFlowTimeOilWaterGas} from '../productionmonitoring/ZoneFlowTimeOilWaterGas';

export interface ZoneFlowProductionAcceptableLimitsResponse {
  depthType: DepthType;
  zoneNumber: number;
  zoneFlowProductionData: ZoneFlowTimeOilWaterGas[];
}
