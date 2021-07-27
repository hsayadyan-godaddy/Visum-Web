import { DepthType } from '../../enums/depth-type';
import { FlowSource } from '../../enums/flow-source';
import { Periodicity } from '../../enums/periodicity';
import { FlowLimitInfo } from './flow-limit-info';
import { UnitOfMeasure } from './unit-of-measure';
import { ZoneFlowData } from './zone-flow-data';
import { ZoneFlowTick } from './zone-flow-tick';
import { ZoneInfo } from './zone-info';

export interface Productionmonitoring {
  periodicity : Periodicity;
  unitOfMeasure : UnitOfMeasure;
  depth : DepthType;
  zoneInfo : ZoneInfo;
  // zonesData;
  // valueTime;
  // rateData;
  // pressureData;
  zoneFlowData : ZoneFlowData;
  flowSource: FlowSource;
  flowLimitInfo : FlowLimitInfo;
  zoneFlowDataLimits : FlowLimitInfo[];
  zoneFlowTick : ZoneFlowTick;
}
