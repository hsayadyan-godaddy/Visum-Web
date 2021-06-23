import { SourceType } from "src/app/enums/sourcetype";

export interface SensorInfo {
    id : string;
    name : string;
    sourceType: SourceType;
}