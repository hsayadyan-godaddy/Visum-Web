import { DepthType } from "src/app/enums/depth-type";
import { UnitOfMeasure } from "../productionmonitoring/unit-of-measure";
import { ZoneFlowTimeOilWaterGas } from "../productionmonitoring/ZoneFlowTimeOilWaterGas";

export interface ZoneFlowProductionHistoryDataResponse {
    // Zone number
    zoneNumber: number;
    // Oil Unit Of Measure Info
    oilUoM: UnitOfMeasure;
    // Water Unit Of Measure Info
    waterUoM: UnitOfMeasure;
    // Gas Unit Of Measure Info
    gasUoM: UnitOfMeasure;
    // Depth type
    depthType: DepthType;
    // Zone info data
    zoneFlowProductionData : ZoneFlowTimeOilWaterGas[];
}