import { HistoricalDataCommand } from '../productionmonitoring/HistoricalDataCommand';

export interface PressureHistoryDataCommand extends HistoricalDataCommand {
  sensorId : string;
}
