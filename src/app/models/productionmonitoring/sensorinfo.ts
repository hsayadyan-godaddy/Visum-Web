import { SourceType } from "src/app/enums/sourcetype";

export interface SensorInfo {
    Id : string;
    Name : string;
    SourceType: SourceType;
}