import { DepthType } from "src/app/enums/depth-type";
import { UnitOfMeasure } from "../productionmonitoring/unit-of-measure";
import { ZoneInfo } from "../productionmonitoring/zone-info";

export interface WellboreProfileZonesResponse {
    
    // UoM of data info
    UnitOfMeasureInfo: UnitOfMeasure;
    // Data depth type
    DepthType: DepthType;
    // Zone info data
    ZoneInfoData : ZoneInfo[];
}