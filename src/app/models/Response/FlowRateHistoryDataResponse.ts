import { FlowRateData } from "../productionmonitoring/flowratedata";
import { UnitOfMeasure } from "../productionmonitoring/unit-of-measure";

export interface FlowRateHistoryDataResponse {
    unitOfMeasureInfo : UnitOfMeasure;
    flowRateData: FlowRateData;
}