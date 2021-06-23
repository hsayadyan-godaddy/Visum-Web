import { DepthType } from "src/app/enums/depth-type";
import { HistoricalDataCommand } from "../productionmonitoring/HistoricalDataCommand";

export interface ZoneFlowProductionHistoryDataCommand extends HistoricalDataCommand {
    depthType : DepthType;
    zoneNumber: number;
}