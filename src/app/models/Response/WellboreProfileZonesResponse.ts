import { DepthType } from "src/app/enums/depth-type";
import { UnitOfMeasure } from "../productionmonitoring/unit-of-measure";
import { ZoneInfo } from "../productionmonitoring/zone-info";

export interface WellboreProfileZonesResponse {
    // UoM of data info
    unitOfMeasureInfo: UnitOfMeasure;
    // Data depth type
    depthType: DepthType;
    // Zone info data
    zoneInfoData : ZoneInfo[];
}