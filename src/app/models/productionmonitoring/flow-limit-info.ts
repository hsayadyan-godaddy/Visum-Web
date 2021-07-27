import { FlowSource } from '../../enums/flow-source';

export interface FlowLimitInfo {
  flowSource : FlowSource;
  min: number;
  max: number;
}
