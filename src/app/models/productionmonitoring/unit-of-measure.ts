import { SystemOfUnits } from 'src/app/enums/system-of-units';
import { MeasureType } from '../../enums/measure-type';

export interface UnitOfMeasure {
  systemOfUnits : SystemOfUnits
  sourceOfMeasure: MeasureType;
  label : string;
}
