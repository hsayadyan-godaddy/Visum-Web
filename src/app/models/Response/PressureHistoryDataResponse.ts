import { PressureData } from "../productionmonitoring/pressuredata";
import { UnitOfMeasure } from "../productionmonitoring/unit-of-measure";

export interface PressureHistoryDataResponse {
    UnitOfMeasureInfo : UnitOfMeasure;
    PressureData : PressureData;
}