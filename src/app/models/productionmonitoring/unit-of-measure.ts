import { SystemOfUnits } from "src/app/enums/system-of-units";
import { MeasureType } from "../../enums/measure-type";

export interface UnitOfMeasure {
    SystemOfUnits : SystemOfUnits
    SourceOfMeasure: MeasureType;
    label : string;
}
