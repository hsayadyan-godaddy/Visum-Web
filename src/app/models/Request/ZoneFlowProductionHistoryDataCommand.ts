import { DepthType } from "src/app/enums/depth-type";
import { HistoricalDataCommand } from "../productionmonitoring/HistoricalDataCommand";

export interface ZoneFlowProductionHistoryDataCommand extends HistoricalDataCommand {
    DepthType : DepthType;
    ZoneNumber: number;
}