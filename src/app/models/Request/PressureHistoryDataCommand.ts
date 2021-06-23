import { HistoricalDataCommand } from "../productionmonitoring/HistoricalDataCommand";

export interface PressureHistoryDataCommand extends HistoricalDataCommand {
    SensorId : string;
}