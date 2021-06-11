import { FlowSource } from "../../enums/flow-source";

export class FlowLimitInfo {
    FlowSource : FlowSource;
    min: number;
    max: number;
}
