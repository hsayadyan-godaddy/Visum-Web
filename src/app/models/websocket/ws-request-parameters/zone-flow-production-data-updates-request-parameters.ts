import { DepthType } from '../../../enums/depth-type';

export class ZoneFlowProductionDataUpdatesRequestParameters {
  public projectId: string;

  public wellId: string;

  public depthType: DepthType;

  public zoneNumber: number;
}
