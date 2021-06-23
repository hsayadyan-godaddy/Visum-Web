import { FlowRateData } from "../productionmonitoring/flowratedata";
import { UnitOfMeasure } from "../productionmonitoring/unit-of-measure";

export interface FlowRateHistoryDataResponse {
    UnitOfMeasureInfo : UnitOfMeasure;
    FlowRateData: FlowRateData;
}