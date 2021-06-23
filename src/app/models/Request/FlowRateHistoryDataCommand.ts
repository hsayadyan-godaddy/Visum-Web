import { HistoricalDataCommand } from "../productionmonitoring/HistoricalDataCommand";

export interface FlowRateHistoryDataCommand extends HistoricalDataCommand {
    SensorId : string;
}