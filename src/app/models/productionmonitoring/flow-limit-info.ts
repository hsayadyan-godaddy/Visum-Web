import { FlowSource } from "../../enums/flow-source";

export interface FlowLimitInfo {
    FlowSource : FlowSource;
    min: number;
    max: number;
}
