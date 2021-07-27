export class UrlHelper {
  public static readonly WellboreSearch : string = 'api/Wellbore/search';

  public static readonly WellboreSearchWellNames : string = 'api/Wellbore/search/wellnames';

  public static readonly WellboreProfileZones : string = 'api/productionmonitoring/wellboreProfile/zones';

  public static readonly PressureSensors : string = 'api/productionmonitoring/pressureFlowRate/pressure/sensors';

  public static readonly FlowRateSensors : string = 'api/productionmonitoring/pressureFlowRate/flowRate/sensors';

  public static readonly PressureHistoryData : string = 'api/productionmonitoring/pressureFlowRate/pressure/historyData';

  public static readonly FlowRateHistoryData : string = 'api/productionmonitoring/pressureFlowRate/flowRate/historyData';

  public static readonly ZoneFlowProductionHistoryData : string = 'api/productionmonitoring/zoneFlowProduction/historyData';

  public static readonly ZoneFlowProductionHistoryDataRates : string = 'api/ProductionMonitoring/zoneFlowProduction/historyData/rates';

  public static readonly ZoneFlowProductionAcceptableLimits : string = 'api/productionmonitoring/zoneFlowProduction/criticalHighlights';
}
