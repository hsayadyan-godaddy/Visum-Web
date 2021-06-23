import { DepthType } from "src/app/enums/depth-type";
import { UnitOfMeasure } from "../productionmonitoring/unit-of-measure";
import { ZoneFlowTimeOilWaterGas } from "../productionmonitoring/ZoneFlowTimeOilWaterGas";

export interface ZoneFlowProductionHistoryDataResponse {
    // Zone number
    ZoneNumber: number;
    // Oil Unit Of Measure Info
    OilUoM: UnitOfMeasure;
    // Water Unit Of Measure Info
    WaterUoM: UnitOfMeasure;
    // Gas Unit Of Measure Info
    GasUoM: UnitOfMeasure;
    // Depth type
    DepthType: DepthType;
    // Zone info data
    ZoneFlowProductionData : ZoneFlowTimeOilWaterGas;
}