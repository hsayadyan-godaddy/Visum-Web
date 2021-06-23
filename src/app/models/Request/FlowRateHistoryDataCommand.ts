import { HistoricalDataCommand } from "../productionmonitoring/HistoricalDataCommand";

export interface FlowRateHistoryDataCommand extends HistoricalDataCommand {
    sensorId : string;
}